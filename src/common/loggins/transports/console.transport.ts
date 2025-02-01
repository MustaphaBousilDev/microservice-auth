import { BaseTransport } from './base.transport';
import { LogLevel } from '../enums/log-level.enum';
import { LogContext } from '../types/log-context.type';

export class ConsoleTransport extends BaseTransport {
  log(level: LogLevel, message: string, context?: LogContext): void {
    const formattedMessage = this.formatMessage(level, message, context);

    switch (level) {
      case LogLevel.ERROR:
        console.error(formattedMessage);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage);
        break;
      case LogLevel.INFO:
        console.info(formattedMessage);
        break;
      default:
        console.log(formattedMessage);
    }
  }
}
