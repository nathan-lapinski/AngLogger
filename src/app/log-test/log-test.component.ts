import { Component, OnInit } from '@angular/core';
import { LogService, LogLevel } from '../shared/log.service';

@Component({
  selector: 'log-test',
  templateUrl: './log-test.component.html',
  styleUrls: ['./log-test.component.css']
})
export class LogTestComponent implements OnInit {

  constructor(private logger: LogService) { }

  ngOnInit() {
  }

  clearLog(): void {
    this.logger.clear();
  }

  testLog(): void {
    this.logger.level = LogLevel.All;
    this.logger.log('Test of the log method', 'Bart', 'Lisa', 2, 3, { name: 'Simpsons'});
  }

}
