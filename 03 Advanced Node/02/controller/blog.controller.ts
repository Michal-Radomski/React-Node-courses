import { Request, RequestHandler, Response } from "express";

import Blog, { BlogI } from "../models/blog.model";
// import createBlogSchema from "../validations/blog.validation";
import { catchAsync } from "../utils/catchAsync";

//* V1
// export const createBlog: RequestHandler = async (req: Request, res: Response): Promise<void> => {
//   try {
//     // Validate the request body
//     const blog = (await createBlogSchema.body.validateAsync(req.body)) as BlogI;

//     // Create the blog with the validated data
//     await Blog.create(blog);

//     res.send({ success: true, message: "Blog created successfully" });
//   } catch (error) {
//     if (error instanceof Error) {
//       res.send({ error: true, message: error.message });
//     }
//   }
// };

// export const getBlogs: RequestHandler = async (req: Request, res: Response): Promise<void> => {
//   console.log("req.ip:", req.ip);
//   try {
//     const blogs = await Blog.find({});
//     res.json(blogs);
//   } catch (error) {
//     if (error instanceof Error) {
//       res.send({ error: true, message: error.message });
//     }
//   }
// };

//* V2
export const createBlog: RequestHandler = catchAsync(async (req: Request, res: Response): Promise<void> => {
  await Blog.create(req.body);
  res.send({ success: true, message: "Blog created successfully" });
});

export const getBlogs: RequestHandler = catchAsync(async (req: Request, res: Response): Promise<void> => {
  console.log("req.ip:", req.ip);
  const blogs = (await Blog.find({})) as BlogI[];
  res.json(blogs);
});
