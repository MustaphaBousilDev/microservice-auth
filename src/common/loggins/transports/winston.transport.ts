import { BaseTransport } from './base.transport';
import { LogLevel } from '../enums/log-level.enum';
import { LogContext } from '../types/log-context.type';
import * as winston from 'winston';

export class WinstonTransport extends BaseTransport {
  private logger: winston.Logger;

  constructor() {
    super();
    this.initializeWinston();
  }
  private initializeWinston(): void {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      defaultMeta: { service: process.env.SERVICE_NAME },
      transports: [
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
      ],
    });

    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      );
    }
  }
  log(level: LogLevel, message: string, context?: LogContext): void {
    this.logger.log(level, message, context);
  }
}
