import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/env/config.module';
import { AppController } from './app.controller';
import { DatabaseModule } from './config/databases/database.module';
import { DatabaseProvider } from './config/databases/constants/database.enum';
import { EnvironmentVariables } from './config/env/env.validation';
import { LoggerModule } from './common/loggins/logger.module';
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
        const isMongoose = DatabaseProvider.MONGOOSE;
        if (isMongoose === DatabaseProvider.MONGOOSE) {
          return {
            provider: DatabaseProvider.SEQUELIZE,
            config: {
              type: 'mongodb',
              host: env.dbHostMongoDB,
              port: Number(env.dbPortMongoDB),
              username: env.dbUsernameMongoDB,
              password: env.dbPasswordMongoDB,
              database: env.dbName,
              options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
              },
            },
          };
        }
        return {
          provider: DatabaseProvider.SEQUELIZE,
          config: {
            type: 'postgres',
            host: env.dbHost,
            port: Number(env.dbPort),
            username: env.dbUsername,
            password: env.dbPassword,
            database: env.dbName,
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
