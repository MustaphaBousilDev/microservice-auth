import { Module, Global, DynamicModule } from '@nestjs/common';
import { LoggerService } from './logger.service';

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
@Module({})
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
