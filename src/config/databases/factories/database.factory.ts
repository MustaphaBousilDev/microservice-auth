import { IDatabase, IDatabaseConfig } from '../interfaces/database.interface';
import { DatabaseProvider } from '../constants/database.enum';
import {
  TypeOrmAdapter,
  PrismaAdapter,
  MongooseAdapter,
  SequelizeAdapter,
} from '../adapters';

export class DatabaseFactory {
  static createDatabase(
    provider: DatabaseProvider,
    config: IDatabaseConfig,
  ): IDatabase {
    switch (provider) {
      case DatabaseProvider.TYPEORM:
        return new TypeOrmAdapter(config);
      case DatabaseProvider.MONGOOSE:
        return new MongooseAdapter(config);
      case DatabaseProvider.PRISMA:
        return new PrismaAdapter(config);
      case DatabaseProvider.SEQUELIZE:
        return new SequelizeAdapter(config);
      default:
        throw new Error(`Unsupported database provider: ${provider}`);
    }
  }
}
