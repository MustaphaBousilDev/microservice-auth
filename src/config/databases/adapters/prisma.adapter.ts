import { BaseAdapter } from './base.adapter';
import { PrismaClient } from '@prisma/client';

export class PrismaAdapter extends BaseAdapter {
  private client: PrismaClient;

  async connect(): Promise<void> {
    this.client = new PrismaClient({
      datasources: {
        db: {
          url: `postgres://${this.config.username}:${this.config.password}@${this.config.host}:${this.config.port}/${this.config.database}`,
        },
      },
    });
    await this.client.$connect();
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.disconnect();
    }
  }

  getConnection() {
    return this.client;
  }
}
