import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/env/config.module';
import { AppController } from './app.controller';
import { DatabaseModule } from './config/databases/database.module';
import {
  DatabaseProvider,
  RelationalDatabaseType,
} from './config/databases/constants/database.enum';
import { EnvironmentVariables } from './config/env/env.validation';
import { LoggerModule } from './common/loggins/logger.module';
import { getDatabaseConfig } from './config/databases/utils/database.utils';
import { IDatabaseConfig } from './config/databases/interfaces/database.interface';
interface DatabaseModuleOptions {
  provider: DatabaseProvider;
  config: IDatabaseConfig;
}
@Module({
  imports: [
    AppConfigModule,
    LoggerModule,
    DatabaseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [EnvironmentVariables],
      useFactory: (env: EnvironmentVariables): DatabaseModuleOptions => {
        const selectedProvider =
          (process.env.DATABASE_PROVIDER as DatabaseProvider) ||
          DatabaseProvider.TYPEORM;
        const selectedDbType =
          (process.env.DATABASE_TYPE as RelationalDatabaseType | 'mongodb') ||
          RelationalDatabaseType.POSTGRES;
        return {
          provider: selectedProvider,
          config: getDatabaseConfig(selectedProvider, selectedDbType, env),
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
