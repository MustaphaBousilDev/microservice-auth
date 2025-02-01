export interface IDatabaseConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  options?: Record<string, any>;
}

export interface IDatabase {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getConnection(): any;
}
