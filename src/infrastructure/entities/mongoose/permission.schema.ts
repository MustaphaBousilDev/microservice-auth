import mongoose, { Document, Schema } from 'mongoose';
import { IResource } from './resource.schema';

export interface IPermission extends Document {
  name: string;
  description?: string;
  resource: IResource['_id'];
  action: string;
}

const PermissionSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  resource: { type: Schema.Types.ObjectId, ref: 'Resource', required: true },
  action: { type: String, required: true },
});

export const Permission = mongoose.model<IPermission>(
  'Permission',
  PermissionSchema,
);
