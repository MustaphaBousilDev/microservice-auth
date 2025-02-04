import { LoggerService } from 'src/common/loggins/logger.service';
import { IDatabaseConfig, IDatabase } from '../interfaces/database.interface';

export abstract class BaseAdapter implements IDatabase {
  protected config: IDatabaseConfig;
  protected readonly logger: LoggerService;
  constructor(config: IDatabaseConfig, logger: LoggerService) {
    this.config = config;
    this.logger = logger;
  }

  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract getConnection(): any;
}
