import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/env/config.module';
import { AppController } from './app.controller';
import { DatabaseModule } from './config/databases/database.module';
import { DatabaseProvider } from './config/databases/constants/database.enum';
import { EnvironmentVariables } from './config/env/env.validation';
import { LoggerModule } from './common/loggins/logger.module';

@Module({
  imports: [
    AppConfigModule,
    LoggerModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [EnvironmentVariables],
      useFactory: (env: EnvironmentVariables) => ({
        level: env.logLevel,
        format: env.logFormat,
        filePath: env.logFilePath,
        isProduction: process.env.NODE_ENV === 'production',
      }),
    }),
    DatabaseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [EnvironmentVariables],
      useFactory: (env: EnvironmentVariables) => ({
        provider: DatabaseProvider.PRISMA,
        config: {
          type: 'postgres',
          host: env.dbHost,
          port: Number(env.dbPort),
          username: env.dbUsername,
          password: env.dbPassword,
          database: env.dbName,
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
