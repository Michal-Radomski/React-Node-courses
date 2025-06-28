import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { ReadStream } from "fs";
import sharp from "sharp";

// import createBlogSchema from "../validations/blog.validation";
import { catchAsync } from "../utils/catchAsync";
import { createBlogService, getBlogsService, getReadableFileStream, uploadFileService } from "../services/blog.service";
import { BlogI } from "../models/blog.model";
import ApiError from "../utils/ApiError";

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
  // await Blog.create(req.body);
  await createBlogService(req.body);
  res.status(httpStatus.CREATED).send({ success: true, message: "Blog created successfully" });
});

export const getBlogs: RequestHandler = catchAsync(async (req: Request, res: Response): Promise<void> => {
  console.log("req.ip:", req.ip);
  // const blogs = (await Blog.find({})) as BlogI[];
  const blogs = (await getBlogsService()) as BlogI[];
  res.status(httpStatus.OK).json(blogs);
});

export const uploadFile: RequestHandler = catchAsync(async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    throw new ApiError(httpStatus.NOT_FOUND, "File not found");
  }
  // res.status(httpStatus.OK).json({ filePath: `/uploads/${req.file.filename}` }); //* V1

  const fileName: string = await uploadFileService(req.file as { buffer: sharp.SharpOptions }); //* V2
  res.status(httpStatus.OK).json({ fileName });
});

export const getFile = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { filename } = req.params;
  const stream: ReadStream = await getReadableFileStream(filename);
  const contentType = `image/${filename.split(".")[1].toLowerCase()}`;
  res.setHeader("Content-Type", contentType);
  stream.pipe(res);
});
