import mongoose, { models, Schema, Document, ObjectId } from "mongoose";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const toJson = require("@meanie/mongoose-to-json");
export interface BlogI extends Document {
  title: string;
  description: string;
  coverImage: string;
  createdBy: ObjectId | string;
}

const blogSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

blogSchema.plugin(toJson);

const Blog = models?.Blog || mongoose.model<BlogI>("Blog", blogSchema);

export default Blog;
