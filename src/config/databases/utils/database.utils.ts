import { EnvironmentVariables } from 'src/config/env/env.validation';
import {
  DatabaseConfig,
  MongoDBConfig,
  PostgresConfig,
} from '../interfaces/database.interface';
import { DatabaseProvider } from '../constants/database.enum';

export function createMongoDBConfig(env: EnvironmentVariables): MongoDBConfig {
  return {
    type: 'mongodb',
    host: env.dbHostMongoDB,
    port: Number(env.dbPortMongoDB),
    username: env.dbUsernameMongoDB,
    password: env.dbPasswordMongoDB,
    database: env.dbName,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  };
}
export function createPostgresConfig(
  env: EnvironmentVariables,
): PostgresConfig {
  return {
    type: 'postgres',
    host: env.dbHost,
    port: Number(env.dbPort),
    username: env.dbUsername,
    password: env.dbPassword,
    database: env.dbName,
  };
}
export function getDatabaseConfig(
  provider: DatabaseProvider,
  env: EnvironmentVariables,
): DatabaseConfig {
  switch (provider) {
    case DatabaseProvider.MONGOOSE:
      return createMongoDBConfig(env);
    case DatabaseProvider.PRISMA:
    case DatabaseProvider.SEQUELIZE:
    case DatabaseProvider.TYPEORM:
      return createPostgresConfig(env);
    default:
      throw new Error(`Unsupported database provider: ${provider}`);
  }
}
