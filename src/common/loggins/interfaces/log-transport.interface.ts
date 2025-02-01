import { LogLevel } from '../enums/log-level.enum';
import { LogContext } from '../types/log-context.type';

export interface ILogTransport {
  log(level: LogLevel, message: string, context?: LogContext): void;
}
