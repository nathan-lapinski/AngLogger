import { Injectable } from '@angular/core';

export enum LogLevel {
  All = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6
}


@Injectable()
export class LogService {
  level: LogLevel = LogLevel.All;
  logWithDate: boolean = true;

  constructor() { }

  private shouldLog(level: LogLevel): boolean {
    return this.level !== LogLevel.Off && level >= this.level;
  }

  private writeToLog(msg: string, level: LogLevel, params: any[]) {
    if(this.shouldLog(level)) {
      let value: string = '';

      if(this.logWithDate) {
        value = new Date() + ' - ';
      }
      value += 'Type: ' + LogLevel[level];
      value += ' - Message: ' + JSON.stringify(msg);
      value += ' - Extra: ' + this.formatParams(params);

      console.log(value);
    }
  }

  private formatParams(params: any[]): string {
    let ret = params.join(',');

    if(params.some( p => typeof p === 'object')) {
      ret = '';
      for (let item of params) {
        ret += JSON.stringify(item) + ',';
      }
    }

    return ret;
  }

  debug(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Debug, optionalParams);
  }

  info(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Info, optionalParams);
  }

  warn(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Warn, optionalParams);
  }

  error(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Error, optionalParams);
  }

  fatal(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Fatal, optionalParams);
  }

  log(msg: string, ...optionalParams: any []) {
    this.writeToLog(msg, LogLevel.All, optionalParams);
  }

}
