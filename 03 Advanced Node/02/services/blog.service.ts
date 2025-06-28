import { Request } from "express";
import fs from "fs";
import httpStatus from "http-status";

import Blog, { BlogI } from "../models/blog.model";
import ApiError from "../utils/ApiError";

export const createBlogService = async (req: Request): Promise<void> => {
  await Blog.create(req.body);
};

export const getBlogsService = async (): Promise<BlogI[]> => {
  const blogs = (await Blog.find({})) as BlogI[];
  return blogs;
};

export const getReadableFileStream = async (filename: string): Promise<fs.ReadStream> => {
  const filePath = `${__dirname}/../uploads/${filename}`;

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  if (!fs.existsSync(filePath)) {
    throw new ApiError(httpStatus.NOT_FOUND, "File not found");
  }

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const stream: fs.ReadStream = fs.createReadStream(filePath);
  return stream;
};
