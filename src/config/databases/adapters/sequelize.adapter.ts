import { BaseAdapter } from './base.adapter';
import { Sequelize } from 'sequelize';
import { LoggerService } from 'src/common/loggins/logger.service';
import { IDatabaseConfig } from '../interfaces/database.interface';

export class SequelizeAdapter extends BaseAdapter {
  private connection: Sequelize;

  constructor(config: IDatabaseConfig, logger?: LoggerService) {
    super(config, logger);
  }

  async connect(): Promise<void> {
    try {
      this.logger.info('Initializing Sequelize connection', {
        host: this.config.host,
        port: this.config.port,
        database: this.config.database,
      });

      this.connection = new Sequelize({
        dialect: 'postgres',
        host: this.config.host,
        port: this.config.port,
        username: this.config.username,
        password: this.config.password,
        database: this.config.database,
        ...this.config.options,
        logging: (sql: string, timing?: number) => {
          this.logger.debug('Sequelize Query', {
            sql,
            executionTime: timing,
            timestamp: new Date(),
          });
        },
        benchmark: true,
        logQueryParameters: true,
      });

      // Set up event listeners
      this.connection.addHook('beforeConnect', (config) => {
        this.logger.debug('Attempting database connection', { config });
      });

      this.connection.addHook('afterConnect', () => {
        this.logger.info('Database connection established');
      });

      // Test the connection
      await this.connection.authenticate();
      this.logger.info('Successfully authenticated with database');
    } catch (error) {
      this.logger.error('Failed to connect to database', {
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.connection) {
        this.logger.info('Disconnecting from database');
        await this.connection.close();
        this.logger.info('Successfully disconnected from database');
      }
    } catch (error) {
      this.logger.error('Failed to disconnect from database', {
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  getConnection(): Sequelize {
    return this.connection;
  }
}
