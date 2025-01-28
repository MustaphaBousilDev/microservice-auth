export interface IEnvironmentVariables {
  // Only expose getters in the interface
  dbHost: string;
  dbPort: string;
  dbUsername: string;
  dbPassword: string;
  dbName: string;
  jwtSecret: string;
  jwtExpiresIn: string;
}
