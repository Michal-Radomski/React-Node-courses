import { Request } from "express";

import Blog, { BlogI } from "../models/blog.model";

export const createBlogService = async (req: Request): Promise<void> => {
  await Blog.create(req.body);
};

export const getBlogsService = async (): Promise<BlogI[]> => {
  const blogs = (await Blog.find({})) as BlogI[];
  return blogs;
};
