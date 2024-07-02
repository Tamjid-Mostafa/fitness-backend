// src/models/Category.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  title: string;
  slug: string;
  color: string;
  description: string;
}

const CategorySchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  color: {
    type: String,
    enum: ['green', 'blue', 'purple', 'orange'],
    required: true,
  },
  description: { type: String },
});

export default mongoose.model<ICategory>('Category', CategorySchema);
