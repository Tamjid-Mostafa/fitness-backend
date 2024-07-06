import mongoose, { Document, Schema } from "mongoose";

interface IProfilePicture {
  url: string;
  alt: string;
  width: string;
  height: string;
}

export interface IUser extends Document {
  name: string;
  bio: string;
  email: string;
  password: string;
  role: string;
  provider: string;
  username: string;
  isVerified: boolean;
  age?: string;
  gender?: string;
  weight?: string;
  height?: string;
  goals?: string;
  profilePicture?: IProfilePicture;
}

const ProfilePictureSchema: Schema = new Schema({
  url: { type: String, required: true },
  alt: { type: String, required: true },
  width: { type: String, required: true },
  height: { type: String, required: true },
});

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  bio: { type: String },
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
  profilePicture: { type: ProfilePictureSchema },
});

export default mongoose.model<IUser>("User", UserSchema);
