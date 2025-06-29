import { Request } from "express";
import fs from "fs";
import httpStatus from "http-status";
// import sharp from "sharp";

import Blog, { BlogI } from "../models/blog.model";
import ApiError from "../utils/ApiError";
import { CacheProcessor } from "../background-tasks";

export const createBlogService = async (req: Request): Promise<void> => {
  await Blog.create(req.body);
};

export const getRecentBlogsService = async (): Promise<BlogI[]> => {
  const blogs = await Blog.find()
    .sort({
      createdAt: -1,
    })
    .limit(10);
  await CacheProcessor.Queue.add("CacheJob", { blogs });
  // await CacheProcessor.startWorker();
  return blogs as BlogI[];
};

export const getBlogsService = async (): Promise<BlogI[]> => {
  const blogs = (await Blog.find({}).lean()) as BlogI[];
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

// export const uploadFileService = async (file: { buffer: sharp.SharpOptions }): Promise<string> => {
//   const filename: string = `image-${Date.now()}.webp`;
//   const outputPath: string = `${__dirname}/../uploads/${filename}`;
//   sharp(file.buffer)
//     .resize(600)
//     .webp({
//       quality: 80,
//       // lossless: true,
//     })
//     .toFile(outputPath);
//   return filename;
// };

export const searchBlogsService = async (searchQuery: string): Promise<BlogI[]> => {
  const blogs = (await Blog.find({ $text: { $search: searchQuery } })) as BlogI[];
  return blogs;
};
