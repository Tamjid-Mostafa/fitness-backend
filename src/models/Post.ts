// src/models/Post.ts
import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from "./User";

export interface IPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  author: Types.ObjectId | IUser;
  mainImage: string;
  altText: string;
  categories: string;
  publishedAt: Date;
  isFeatured: boolean;
  body: string;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  mainImage: { type: String, required: true },
  altText: { type: String, required: true },
  categories: { type: String, required: true },
  publishedAt: { type: Date, required: true },
  isFeatured: { type: Boolean, required: true },
  body: { type: String, required: true },
});

export default mongoose.model<IPost>("Post", PostSchema);
