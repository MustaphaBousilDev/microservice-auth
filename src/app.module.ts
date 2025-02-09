import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/env/config.module';
import { AppController } from './app.controller';
import { DatabaseModule } from './config/databases/database.module';
import { DatabaseProvider } from './config/databases/constants/database.enum';
import { EnvironmentVariables } from './config/env/env.validation';
import { LoggerModule } from './common/loggins/logger.module';
import { getDatabaseConfig } from './config/databases/utils/database.utils';
interface DatabaseModuleOptions {
  provider: DatabaseProvider;
  config: IDatabaseConfig;
}

interface IDatabaseConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  options?: any;
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
          DatabaseProvider.MONGOOSE;
        return {
          provider: selectedProvider,
          config: getDatabaseConfig(selectedProvider, env),
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
