import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validate: (config: Record<string, unknown>) => {
        return {
          DB_HOST: config.DB_HOST,
          DB_PORT: config.DB_PORT,
          DB_USERNAME: config.DB_USERNAME,
          DB_PASSWORD: config.DB_PASSWORD,
          DB_NAME: config.DB_NAME,
          JWT_SECRET: config.JWT_SECRET,
          JWT_EXPIRES_IN: config.JWT_EXPIRES_IN,
        };
      },
    }),
  ],
  providers: [
    {
      provide: EnvironmentVariables,
      useFactory: (configService: ConfigService) => {
        return new EnvironmentVariables(configService);
      },
      inject: [ConfigService],
    },
  ],
  exports: [EnvironmentVariables],
})
export class AppConfigModule {}
