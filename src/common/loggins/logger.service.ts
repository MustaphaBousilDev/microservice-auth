import { Injectable, Scope } from '@nestjs/common';
import { ILogger } from './interfaces/logger.interface';
import { LogLevel } from './enums/log-level.enum';
import { LogContext } from './types/log-context.type';
import { LoggerFactory, TransportType } from './factories/logger.factory';
import { ILogTransport } from './interfaces/log-transport.interface';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService implements ILogger {
  private transports: Map<TransportType, ILogTransport>;

  constructor() {
    this.transports = new Map();
    this.initializeTransports();
  }

  private initializeTransports(): void {
    if (process.env.NODE_ENV === 'production') {
      this.addTransport(TransportType.WINSTON);
    } else {
      this.addTransport(TransportType.CONSOLE);
      this.addTransport(TransportType.FILE);
    }
  }

  addTransport(type: TransportType, options?: any): void {
    const transport = LoggerFactory.createTransport(type, options);
    this.transports.set(type, transport);
  }

  removeTransport(type: TransportType): void {
    this.transports.delete(type);
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

  private log(level: LogLevel, message: string, context?: LogContext): void {
    const enrichedContext = this.enrichContext(context);

    this.transports.forEach((transport) => {
      transport.log(level, message, enrichedContext);
    });
  }

  private enrichContext(context?: LogContext): LogContext {
    return {
      ...context,
      timestamp: new Date(),
      environment: process.env.NODE_ENV,
      serviceName: process.env.SERVICE_NAME,
    };
  }
}
