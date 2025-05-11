import mongoose, { Schema, Document } from "mongoose";

export interface IUserModel extends Document {
  googleId: String;
  displayName: String;
  createdAt: Date;
}

const userSchema: Schema = new mongoose.Schema(
  {
    googleId: { type: String, required: false },
    displayName: { type: String, required: false, minlength: [3, "Min displayName length is 3 characters"] },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IUserModel>("User", userSchema);
