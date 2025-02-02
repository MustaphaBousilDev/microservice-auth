import mongoose, { Schema } from 'mongoose';
import { IUser } from './user.schema';

export interface IAuthLog extends Document {
  user: IUser['_id'];
  action: string;
  ipAddress: string;
  userAgent: string;
  metadata?: any;
  createdAt: Date;
}

const AuthLogSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  ipAddress: { type: String, required: true },
  userAgent: { type: String, required: true },
  metadata: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
});

export const AuthLog = mongoose.model<IAuthLog>('AuthLog', AuthLogSchema);
