import { BaseAdapter } from './base.adapter';
import { DataSource } from 'typeorm';

export class TypeOrmAdapter extends BaseAdapter {
  private connection: DataSource;

  async connect(): Promise<void> {
    this.connection = new DataSource({
      type: 'postgres',
      host: this.config.host,
      port: this.config.port,
      username: this.config.username,
      password: this.config.password,
      database: this.config.database,
      ...this.config.options,
    });

    await this.connection.initialize();
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.destroy();
    }
  }

  getConnection(): DataSource {
    return this.connection;
  }
}
