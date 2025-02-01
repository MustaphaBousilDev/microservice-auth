import { BaseTransport } from './base.transport';
import { LogLevel } from '../enums/log-level.enum';
import { LogContext } from '../types/log-context.type';
import * as fs from 'fs';
import * as path from 'path';

export class FileTransport extends BaseTransport {
  private logDir: string;

  constructor(logDir: string = 'logs') {
    super();
    this.logDir = logDir;
    this.ensureLogDirectory();
  }

  private ensureLogDirectory(): void {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  log(level: LogLevel, message: string, context?: LogContext): void {
    const logFile = path.join(this.logDir, `${level}.log`);
    const formattedMessage = this.formatMessage(level, message, context);

    fs.appendFileSync(logFile, formattedMessage + '\n');
  }
}
