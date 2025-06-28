import mongoose, { models, Schema, Document, ObjectId } from "mongoose";

export interface BlogI extends Document {
  title: string;
  description: string;
  coverImage: string;
  createdBy: ObjectId | string;
}

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
  },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
});

const Blog = models?.Blog || mongoose.model<BlogI>("Blog", blogSchema);

export default Blog;
