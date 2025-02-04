import { LoggerService } from 'src/common/loggins/logger.service';
import { BaseAdapter } from './base.adapter';
import mongoose from 'mongoose';
import { IDatabaseConfig } from '../interfaces/database.interface';

export class MongooseAdapter extends BaseAdapter {
  private connection: mongoose.Connection;
  constructor(config: IDatabaseConfig, logger?: LoggerService) {
    super(config, logger);
  }
  async connect(): Promise<void> {
    try {
      this.logger.info('Connecting to MongoDB', {
        host: this.config.host,
        database: this.config.database,
      });

      await mongoose.connect(
        `mongodb://${this.config.username}:${this.config.password}@${this.config.host}:${this.config.database}`,
      );
      this.connection = mongoose.connection;

      this.logger.info('Successfully connected to MongoDB');
    } catch (error) {
      this.logger.error('Failed to connect to MongoDB', {
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
    }
  }

  getConnection() {
    return this.connection;
  }
}
