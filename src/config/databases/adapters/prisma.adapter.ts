import { BaseAdapter } from './base.adapter';
import { Prisma, PrismaClient } from '@prisma/client';
import { LoggerService } from 'src/common/loggins/logger.service';
import { IDatabaseConfig } from '../interfaces/database.interface';

export class PrismaAdapter extends BaseAdapter {
  private client: PrismaClient;

  constructor(config: IDatabaseConfig, logger?: LoggerService) {
    super(config, logger);
  }

  async connect(): Promise<void> {
    try {
      this.logger.info('Initializing Prisma client', {
        host: this.config.host,
        port: this.config.port,
        database: this.config.database,
      });

      this.client = new PrismaClient({
        datasources: {
          db: {
            url: `postgres://${this.config.username}:${this.config.password}@${this.config.host}:${this.config.port}/${this.config.database}`,
          },
        },
        log: [
          { emit: 'event', level: 'query' },
          { emit: 'event', level: 'error' },
          { emit: 'event', level: 'info' },
          { emit: 'event', level: 'warn' },
        ],
      });

      // Set up Prisma event listeners for logging
      (this.client.$on as any)('query', (e: Prisma.QueryEvent) => {
        this.logger.debug('Prisma Query', {
          query: e.query,
          params: e.params,
          duration: e.duration,
          timestamp: new Date(e.timestamp),
        });
      });

      (this.client.$on as any)('error', (e: Prisma.LogEvent) => {
        this.logger.error('Prisma Error', {
          message: e.message,
          target: e.target,
          timestamp: new Date(e.timestamp),
        });
      });

      (this.client.$on as any)('info', (e: Prisma.LogEvent) => {
        this.logger.info('Prisma Info', {
          message: e.message,
          target: e.target,
          timestamp: new Date(e.timestamp),
        });
      });

      (this.client.$on as any)('warn', (e: Prisma.LogEvent) => {
        this.logger.warn('Prisma Warning', {
          message: e.message,
          target: e.target,
          timestamp: new Date(e.timestamp),
        });
      });

      await this.client.$connect();
      this.logger.info('Successfully connected to Prisma database');
    } catch (error) {
      this.logger.error('Failed to connect to Prisma database', {
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.client) {
        this.logger.info('Disconnecting Prisma client');
        await this.client.$disconnect();
        this.logger.info('Successfully disconnected Prisma client');
      }
    } catch (error) {
      this.logger.error('Failed to disconnect Prisma client', {
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  getConnection() {
    return this.client;
  }
}
