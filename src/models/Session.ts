// src/models/Session.ts
import mongoose, { Schema, Document } from 'mongoose';

interface ISession extends Document {
  userId: string;
  token: string;
  createdAt: Date;
  expiresAt: Date;
}

const SessionSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const Session = mongoose.model<ISession>('Session', SessionSchema);

export default Session;
export { ISession };
