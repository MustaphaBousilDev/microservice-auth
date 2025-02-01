import { IDatabaseConfig, IDatabase } from '../interfaces/database.interface';

export abstract class BaseAdapter implements IDatabase {
  protected config: IDatabaseConfig;

  constructor(config: IDatabaseConfig) {
    this.config = config;
  }

  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract getConnection(): any;
}
