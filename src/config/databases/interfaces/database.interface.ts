import { RelationalDatabaseType } from '../constants/database.enum';

export interface IDatabaseConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  options?: Record<string, any>;
}
export interface MongoDBConfig {
  type: 'mongodb';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  options?: {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
  };
}
export interface RelationalDatabaseConfig {
  type: RelationalDatabaseType;
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  database: string;
  options?: Record<string, any>;
}
export interface PostgresConfig {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  options?: any;
}
export type DatabaseConfig = MongoDBConfig | RelationalDatabaseConfig;

export interface IDatabase {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getConnection(): any;
}
