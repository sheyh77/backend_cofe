import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  phone: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);