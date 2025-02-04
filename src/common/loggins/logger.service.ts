import { Injectable } from '@nestjs/common';
import { ILogger } from './interfaces/logger.interface';
import { LogLevel } from './enums/log-level.enum';
import { LogContext } from './types/log-context.type';
import { ILogTransport } from './interfaces/log-transport.interface';
@Injectable()
export class LoggerService implements ILogger {
  private readonly transports: ILogTransport[];
  private logLevel: LogLevel;

  constructor(options: { transports: ILogTransport[]; level?: LogLevel }) {
    this.transports = options.transports;
    this.logLevel = options.level || LogLevel.INFO;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = Object.values(LogLevel);
    const currentLevelIndex = levels.indexOf(this.logLevel);
    const targetLevelIndex = levels.indexOf(level);
    return targetLevelIndex <= currentLevelIndex;
  }

  log(level: LogLevel, message: string, context?: LogContext): void {
    if (this.shouldLog(level)) {
      this.transports.forEach((transport) => {
        transport.log(level, message, context);
      });
    }
  }

  error(message: string, context?: LogContext): void {
    this.log(LogLevel.ERROR, message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.log(LogLevel.WARN, message, context);
  }

  info(message: string, context?: LogContext): void {
    this.log(LogLevel.INFO, message, context);
  }

  debug(message: string, context?: LogContext): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  trace(message: string, context?: LogContext): void {
    this.log(LogLevel.TRACE, message, context);
  }
}
