import { DynamicModule, Module } from '@nestjs/common';
import { DatabaseProvider } from './constants/database.enum';
import { IDatabaseConfig } from './interfaces/database.interface';
import { DatabaseFactory } from './factories/database.factory';

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
}
