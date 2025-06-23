import mongoose, { models, Schema, Document } from "mongoose";

export interface BlogI extends Document {
  title: string;
  description: string;
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
});

const Blog = models?.Blog || mongoose.model<BlogI>("Blog", blogSchema);

export default Blog;
