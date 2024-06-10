import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  provider: string;
  username: string;
  isVerified: boolean;
  age?: String;
  gender?: string;
  weight?: String;
  height?: String;
  goals?: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "member" },
  provider: { type: String, required: true },
  username: { type: String, required: true },
  isVerified: { type: Boolean, required: true, default: false },
  age: { type: String },
  gender: { type: String },
  weight: { type: String },
  height: { type: String },
  goals: { type: String },
});

export default mongoose.model<IUser>("User", UserSchema);
