import { BaseAdapter } from './base.adapter';
import mongoose from 'mongoose';

export class MongooseAdapter extends BaseAdapter {
  connection: mongoose.Connection;

  async connect(): Promise<void> {
    await mongoose.connect(
      `mongodb://${this.config.username}:${this.config.password}@${this.config.host}:${this.config.database}`,
    );
    this.connection = mongoose.connection;
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
    }
  }

  getConnection() {
    return this.connection;
  }
}
