import mongoose, { Document, Schema } from 'mongoose';

export interface IResource extends Document {
  name: string;
  description?: string;
}

const ResourceSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
});

export const Resource = mongoose.model<IResource>('Resource', ResourceSchema);
