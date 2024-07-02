// models/Post.ts

import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  author: mongoose.Schema.Types.ObjectId;
  mainImage: {
    url: string;
    alt: string;
  };
  category: mongoose.Schema.Types.ObjectId;
  publishedAt: Date;
  isFeatured: boolean;
  body: string;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true, maxlength: 200 },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  mainImage: {
    url: { type: String, required: true },
    alt: { type: String, required: true },
  },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  publishedAt: { type: Date, required: true },
  isFeatured: { type: Boolean, default: false },
  body: { type: String, required: true },
});

export default mongoose.model<IPost>("Post", PostSchema);
