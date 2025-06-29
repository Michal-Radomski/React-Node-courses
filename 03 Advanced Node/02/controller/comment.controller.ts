import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";

import { addCommentService } from "../services/comment.service";
import ApiError from "../utils/ApiError";
import { catchAsync } from "../utils/catchAsync";
import { BlogI } from "../models/blog.model";

export const addComment: RequestHandler = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const blog = (await addCommentService(req.body.blogId, req.body.comment)) as BlogI;

  if (blog) {
    res.json({ blog });
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, "Blog not found");
  }
});
