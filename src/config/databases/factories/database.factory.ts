import { IDatabase, IDatabaseConfig } from '../interfaces/database.interface';
import { DatabaseProvider } from '../constants/database.enum';
import {
  TypeOrmAdapter,
  PrismaAdapter,
  MongooseAdapter,
  SequelizeAdapter,
} from '../adapters';
import { LoggerService } from 'src/common/loggins/logger.service';
import { LogLevel } from 'src/common/loggins/enums/log-level.enum';
import { ConsoleTransport } from 'src/common/loggins/transports/console.transport';

export class DatabaseFactory {
  static logger = new LoggerService({
    transports: [new ConsoleTransport()], // Add your transports here
    level: LogLevel.INFO,
  });
  static createDatabase(
    provider: DatabaseProvider,
    config: IDatabaseConfig,
  ): IDatabase {
    try {
      this.logger.info('Creating database connection', {
        provider,
        host: config.host,
        port: config.port,
        database: config.database,
      });

      let adapter: IDatabase;

      switch (provider) {
        case DatabaseProvider.TYPEORM:
          adapter = new TypeOrmAdapter(config, this.logger);
          break;
        case DatabaseProvider.MONGOOSE:
          adapter = new MongooseAdapter(config, this.logger);
          break;
        case DatabaseProvider.PRISMA:
          adapter = new PrismaAdapter(config, this.logger);
          break;
        case DatabaseProvider.SEQUELIZE:
          adapter = new SequelizeAdapter(config, this.logger);
          break;
        default:
          this.logger.error('Unsupported database provider', { provider });
          throw new Error(`Unsupported database provider: ${provider}`);
      }

      this.logger.info('Database adapter created successfully', {
        provider,
        adapterType: adapter.constructor.name,
      });

      return adapter;
    } catch (error) {
      this.logger.error('Failed to create database adapter', {
        provider,
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }
}
