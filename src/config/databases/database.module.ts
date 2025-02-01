import { DynamicModule, Module } from '@nestjs/common';
import { DatabaseProvider } from './constants/database.enum';
import { IDatabaseConfig } from './interfaces/database.interface';
import { DatabaseFactory } from './factories/database.factory';

interface DatabaseModuleOptions {
  provider: DatabaseProvider;
  config: IDatabaseConfig;
}

interface DatabaseAsyncOptions {
  imports: any[];
  useFactory: (
    ...args: any[]
  ) => Promise<DatabaseModuleOptions> | DatabaseModuleOptions;
  inject: any[];
}

@Module({})
export class DatabaseModule {
  static forRoot(
    provider: DatabaseProvider,
    config: IDatabaseConfig,
  ): DynamicModule {
    const database = DatabaseFactory.createDatabase(provider, config);
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'DATABASE',
          useValue: database,
        },
      ],
      exports: ['DATABASE'],
    };
  }

  static forRootAsync(options: DatabaseAsyncOptions): DynamicModule {
    return {
      module: DatabaseModule,
      imports: options.imports,
      providers: [
        {
          provide: 'DATABASE_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject,
        },
        {
          provide: 'DATABASE',
          // dbOptions took his value from result of injection inject: ['DATABASE_OPTIONS'],
          useFactory: (dbOptions: DatabaseModuleOptions) => {
            //console.log(dbOptions);
            return DatabaseFactory.createDatabase(
              dbOptions.provider,
              dbOptions.config,
            );
          },
          inject: ['DATABASE_OPTIONS'],
        },
      ],
      exports: ['DATABASE'],
    };
  }
}
