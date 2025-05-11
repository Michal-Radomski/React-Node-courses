import mongoose, { Schema, Document } from "mongoose";

export interface IBlogModel extends Document {
  title: String;
  content: String;
  createdAt: Date;
  _user: Schema.Types.ObjectId;
  imageUrl: String;
}

const blogSchema: Schema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: [3, "Min displayName length is 3 characters"] },
    content: { type: String, required: true, minlength: [3, "Min displayName length is 3 characters"] },
    createdAt: { type: Date, default: Date.now },
    _user: { type: Schema.Types.ObjectId, ref: "User" },
    imageUrl: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.model<IBlogModel>("Blog", blogSchema);

// Is is possible to add another index or cache server
