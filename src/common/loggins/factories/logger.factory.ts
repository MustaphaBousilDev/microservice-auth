import { ILogTransport } from '../interfaces/log-transport.interface';
import { ConsoleTransport } from '../transports/console.transport';
import { FileTransport } from '../transports/file.transport';
import { WinstonTransport } from '../transports/winston.transport';

export enum TransportType {
  CONSOLE = 'console',
  FILE = 'file',
  WINSTON = 'winston',
}
export class LoggerFactory {
  static createTransport(type: TransportType, options?: any): ILogTransport {
    switch (type) {
      case TransportType.CONSOLE:
        return new ConsoleTransport();
      case TransportType.FILE:
        return new FileTransport(options?.logDir);
      case TransportType.WINSTON:
        return new WinstonTransport();
      default:
        throw new Error(`Unsupported transport type: ${type}`);
    }
  }
}
