import { Request, RequestHandler, Response } from "express";

import Blog from "../models/blog.model";

export const createBlog: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    await Blog.create(req.body);
    res.send({ success: true, message: "Blog created successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.end({ error: true, message: error.message });
    }
  }
};

export const getBlogs: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  console.log("req.ip:", req.ip);
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    if (error instanceof Error) {
      res.end({ error: true, message: error.message });
    }
  }
};
