import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { LogEntry } from './log.service';

export abstract class LogPublisher {
    location: string;

    abstract log(record: LogEntry): Observable<boolean>;
    abstract clear(): Observable<boolean>;
}

// for writing logs to the console
export class LogConsole extends LogPublisher {
    log(record: LogEntry): Observable<boolean> {
        console.log(record.buildLogString());

        return Observable.of(true);
    }

    clear(): Observable<boolean> {
        console.clear();

        return Observable.of(true);
    }
}

// for writing logs to local storage
// the value stored at the key of this.location is
// a stringified array of LogEntry objects
export class LogLocalStorage extends LogPublisher {
    constructor() {
        super();

        this.location = 'logging';
    }

    log(record: LogEntry): Observable<boolean> {
        let ret: boolean = false;
        let values: LogEntry[];

        try {
            // retrieve value for this location from local storage
            values = JSON.parse(localStorage.getItem(this.location)) || [];
            // add new log entry
            values.push(record);
            // store array into local storage
            localStorage.setItem(this.location, JSON.stringify(values));

            ret = true;
        } catch (ex) {
            console.log(ex);
        }

        return Observable.of(ret);
    }
    clear(): Observable<boolean> {
        localStorage.removeItem(this.location);
        return Observable.of(true);
    }
}