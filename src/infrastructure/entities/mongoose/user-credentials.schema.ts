import mongoose, { Schema } from 'mongoose';
import { IUser } from './user.schema';

export interface IUserCredentials extends Document {
  user: IUser['_id'];
  passwordHash: string;
  twoFactorSecret?: string;
  isTwoFactorEnabled: boolean;
  passwordChangedAt?: Date;
  failedLoginAttempts: number;
  lastFailedLoginAt?: Date;
}
const UserCredentialsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  passwordHash: { type: String, required: true },
  twoFactorSecret: String,
  isTwoFactorEnabled: { type: Boolean, default: false },
  passwordChangedAt: Date,
  failedLoginAttempts: { type: Number, default: 0 },
  lastFailedLoginAt: Date,
});

export const UserCredentials = mongoose.model<IUserCredentials>(
  'UserCredentials',
  UserCredentialsSchema,
);
