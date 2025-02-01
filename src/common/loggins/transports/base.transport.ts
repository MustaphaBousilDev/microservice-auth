import { ILogTransport } from '../interfaces/log-transport.interface';
import { LogLevel } from '../enums/log-level.enum';
import { LogContext } from '../types/log-context.type';

export abstract class BaseTransport implements ILogTransport {
  protected formatMessage(
    level: LogLevel,
    message: string,
    context?: LogContext,
  ): string {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      message,
      ...context,
    });
  }

  abstract log(level: LogLevel, message: string, context?: LogContext): void;
}
