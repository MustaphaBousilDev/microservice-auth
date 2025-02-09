import { EnvironmentVariables } from 'src/config/env/env.validation';
import {
  IDatabaseConfig,
  PostgresConfig,
} from '../interfaces/database.interface';
import {
  DatabaseProvider,
  RelationalDatabaseType,
} from '../constants/database.enum';
export function createMongoDBConfig(
  env: EnvironmentVariables,
): IDatabaseConfig {
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
export function createRelationalConfig(
  dbType: RelationalDatabaseType,
  env: EnvironmentVariables,
): IDatabaseConfig {
  if (dbType === RelationalDatabaseType.SQLITE) {
    return {
      type: RelationalDatabaseType.SQLITE,
      host: 'localhost', // Required by IDatabaseConfig
      port: 0, // Required by IDatabaseConfig
      username: 'sqlite', // Required by IDatabaseConfig
      password: 'sqlite', // Required by IDatabaseConfig
      database: `${env.dbName}.sqlite`,
      options: {
        type: 'sqlite',
        database: `${env.dbName}.sqlite`,
      },
    };
  }
  return {
    type: dbType,
    host: env.dbHost,
    port: Number(env.dbPort),
    username: env.dbUsername,
    password: env.dbPassword,
    database: env.dbName,
    options: {},
  };
}
export function getDatabaseConfig(
  provider: DatabaseProvider,
  dbType: RelationalDatabaseType | 'mongodb',
  env: EnvironmentVariables,
): IDatabaseConfig {
  console.log('###-- getDatabaseConfig');
  if (provider === DatabaseProvider.MONGOOSE) {
    if (dbType !== 'mongodb') {
      throw new Error(`Provider ${provider} only supports MongoDB`);
    }
    return createMongoDBConfig(env);
  }

  if (dbType === 'mongodb') {
    throw new Error(`MongoDB is not supported with ${provider} provider`);
  }

  return createRelationalConfig(dbType, env);
}
