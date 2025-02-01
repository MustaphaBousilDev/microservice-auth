import { BaseAdapter } from './base.adapter';
import { Sequelize } from 'sequelize';

export class SequelizeAdapter extends BaseAdapter {
  private connection: Sequelize;

  async connect(): Promise<void> {
    this.connection = new Sequelize({
      dialect: 'postgres',
      host: this.config.host,
      port: this.config.port,
      username: this.config.username,
      password: this.config.password,
      database: this.config.database,
      ...this.config.options,
    });

    await this.connection.authenticate();
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
    }
  }

  getConnection(): Sequelize {
    return this.connection;
  }
}
