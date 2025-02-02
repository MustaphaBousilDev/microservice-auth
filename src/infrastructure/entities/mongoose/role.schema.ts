import mongoose, { Document, Schema } from 'mongoose';
import { IPermission } from './permission.schema';

export interface IRole extends Document {
  name: string;
  description?: string;
  permissions: Array<IPermission['_id']>;
}

const RoleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
});

export const Role = mongoose.model<IRole>('Role', RoleSchema);
