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

  public get dbPort(): string {
    return this._dbPort;
  }

  public get dbUsername(): string {
    return this._dbUsername;
  }

  public get dbPassword(): string {
    return this._dbPassword;
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
