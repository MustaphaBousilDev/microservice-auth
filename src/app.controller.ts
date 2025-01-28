import { Controller, Get } from '@nestjs/common';
import { EnvironmentVariables } from './config/env/env.validation';

@Controller()
export class AppController {
  constructor(private readonly env: EnvironmentVariables) {}

  @Get('config-test')
  getConfig() {
    return {
      dbHost: this.env.dbHost,
      dbPort: this.env.dbPort,
      dbName: this.env.dbName,
    };
  }
}
