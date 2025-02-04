import { IsString, validateSync } from 'class-validator';
import { IEnvironmentVariables } from './env.interfaces';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvironmentVariables implements IEnvironmentVariables {
  @IsString()
  private _dbHost: string;

  @IsString()
  private _dbPort: string;

  @IsString()
  private _dbUsername: string;

  @IsString()
  private _dbPassword: string;

  @IsString()
  private _dbName: string;

  @IsString()
  private _jwtSecret: string;

  @IsString()
  private _jwtExpiresIn: string;

  @IsString()
  private _logLevel: string;

  @IsString()
  private _logFormat: string;

  @IsString()
  private _logFilePath: string;

  @IsString()
  private _dbHostMongo: string;

  @IsString()
  private _dbPortMongo: string;

  @IsString()
  private _dbUsernameMongo: string;

  @IsString()
  private _dbPasswordMongo: string;

  constructor(configService: ConfigService) {
    this._dbHost = configService.getOrThrow<string>('DB_HOST');
    this._dbPort = configService.getOrThrow<string>('DB_PORT');
    this._dbUsername = configService.getOrThrow<string>('DB_USERNAME');
    this._dbPassword = configService.getOrThrow<string>('DB_PASSWORD');
    this._dbName = configService.getOrThrow<string>('DB_NAME');
    this._jwtSecret = configService.getOrThrow<string>('JWT_SECRET');
    this._jwtExpiresIn = configService.getOrThrow<string>('JWT_EXPIRES_IN');
    this._logLevel = configService.getOrThrow<string>('LOG_LEVEL');
    this._logFormat = configService.getOrThrow<string>('LOG_FORMAT');
    this._logFilePath = configService.getOrThrow<string>('LOG_FILE_PATH');
    this._dbHostMongo = configService.getOrThrow<string>('DB_HOST_MONGO');
    this._dbPortMongo = configService.getOrThrow<string>('DB_PORT_MONGO');
    this._dbUsernameMongo =
      configService.getOrThrow<string>('DB_USERNAME_MONGO');
    this._dbPasswordMongo =
      configService.getOrThrow<string>('DB_PASSWORD_MONGO');

    this.validateConfig();
  }

  private validateConfig(): void {
    const errors = validateSync(this);
    if (errors.length > 0) {
      throw new Error(`Environment validation failed: ${errors.toString()}`);
    }
  }

  public get dbHost(): string {
    return this._dbHost;
  }

  public get dbHostMongoDB(): string {
    return this._dbHostMongo;
  }

  public get dbPort(): string {
    return this._dbPort;
  }

  public get dbPortMongoDB(): string {
    return this._dbPortMongo;
  }

  public get dbUsername(): string {
    return this._dbUsername;
  }
  public get dbUsernameMongoDB(): string {
    return this._dbUsernameMongo;
  }

  public get dbPassword(): string {
    return this._dbPassword;
  }
  public get dbPasswordMongoDB(): string {
    return this._dbPasswordMongo;
  }

  public get dbName(): string {
    return this._dbName;
  }

  public get jwtSecret(): string {
    return this._jwtSecret;
  }

  public get jwtExpiresIn(): string {
    return this._jwtExpiresIn;
  }
  get logLevel(): string {
    return this._logLevel;
  }

  get logFormat(): string {
    return this._logFormat;
  }

  get logFilePath(): string {
    return this._logFilePath;
  }
}
