import { LoggerService } from 'src/common/loggins/logger.service';
import { IDatabaseConfig } from '../interfaces/database.interface';
import { BaseAdapter } from './base.adapter';
import { DataSource, DataSourceOptions } from 'typeorm';
import { RelationalDatabaseType } from '../constants/database.enum';

export class TypeOrmAdapter extends BaseAdapter {
  constructor(config: IDatabaseConfig, logger?: LoggerService) {
    super(config, logger);
    this.connect();
  }

  private connection: DataSource;

  async connect(): Promise<void> {
    try {
      this.logger?.info('Initializing TypeORM connection', {
        type: this.config.type,
        host: this.config.host,
        database: this.config.database,
      });

      let dataSourceOptions: DataSourceOptions;

      // Create different configurations based on database type
      if (this.config.type === RelationalDatabaseType.SQLITE) {
        dataSourceOptions = {
          type: 'sqlite',
          database: this.config.database,
          ...this.config.options,
        };
      } else {
        dataSourceOptions = {
          type: this.config.type as any,
          host: this.config.host,
          port: this.config.port,
          username: this.config.username,
          password: this.config.password,
          database: this.config.database,
          ...this.config.options,
        };
      }

      this.connection = new DataSource(dataSourceOptions);

      await this.connection.initialize();
      this.logger?.info('TypeORM connection initialized successfully');
    } catch (error) {
      this.logger?.error('Failed to initialize TypeORM connection', {
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.connection) {
        this.logger?.info('Disconnecting TypeORM');
        await this.connection.destroy();
        this.logger?.info('TypeORM disconnected successfully');
      }
    } catch (error) {
      this.logger?.error('Failed to disconnect TypeORM', {
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  getConnection(): DataSource {
    return this.connection;
  }
}
