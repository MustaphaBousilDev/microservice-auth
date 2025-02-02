import mongoose, { Schema } from 'mongoose';
import { IUser } from './user.schema';

export interface ISession extends Document {
  user: IUser['_id'];
  token: string;
  refreshToken: string;
  ipAddress: string;
  userAgent: string;
  expiresAt: Date;
  lastActivityAt: Date;
  isValid: boolean;
}

const SessionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  refreshToken: { type: String, required: true },
  ipAddress: { type: String, required: true },
  userAgent: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  lastActivityAt: { type: Date, default: Date.now },
  isValid: { type: Boolean, default: true },
});

export const Session = mongoose.model<ISession>('Session', SessionSchema);
