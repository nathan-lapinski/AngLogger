import { Injectable } from '@angular/core';
import { LogPublisher, LogConsole, LogLocalStorage } from './log-publishers';

@Injectable()
export class LogPublishersService {
    constructor() {
        this.buildPublishers();
    }

    publishers: LogPublisher[] = [];

    buildPublishers(): void {
        // test cases
        this.publishers.push(new LogConsole());
        this.publishers.push(new LogLocalStorage());
    }
}