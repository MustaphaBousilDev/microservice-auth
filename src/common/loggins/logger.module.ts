import { Module, Global, DynamicModule } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ILogTransport } from './interfaces/log-transport.interface';
import { ConsoleTransport } from './transports/console.transport';
import { FileTransport } from './transports/file.transport';
import { LogLevel } from './enums/log-level.enum';

export interface LoggerModuleOptions {
  level: string;
  format: string;
  filePath: string;
  isProduction: boolean;
}

export interface LoggerModuleAsyncOptions {
  imports: any[];
  useFactory: (...args: any[]) => LoggerModuleOptions;
  inject: any[];
}

@Global()
@Module({
  providers: [
    {
      provide: LoggerService,
      useFactory: () => {
        const isProduction = process.env.NODE_ENV === 'production';
        const transports: ILogTransport[] = [new ConsoleTransport()];

        // Add file transport in production
        if (isProduction) {
          transports.push(new FileTransport('logs'));
        }

        return new LoggerService({
          transports,
          level: isProduction ? LogLevel.INFO : LogLevel.DEBUG,
        });
      },
    },
  ],
  exports: [LoggerService],
})
export class LoggerModule {
  static forRoot(options: LoggerModuleOptions): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: 'LOGGER_OPTIONS',
          useValue: options,
        },
        LoggerService,
      ],
      exports: [LoggerService],
    };
  }

  static forRootAsync(options: LoggerModuleAsyncOptions): DynamicModule {
    return {
      module: LoggerModule,
      imports: options.imports,
      providers: [
        {
          provide: 'LOGGER_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject,
        },
        LoggerService,
      ],
      exports: [LoggerService],
    };
  }
}
