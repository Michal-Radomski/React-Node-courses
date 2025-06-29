import { NextFunction, Request, Response } from "express";

import logger from "../../config/logger";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const redisClient = require("../../config/redis");

export const getRecentBlogCache = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const key = "recent-blogs";
    const cachedBlogs = await redisClient.get(key);
    if (cachedBlogs) {
      res.json(JSON.parse(cachedBlogs));
    } else {
      next();
    }
  } catch (error) {
    logger.error(error);
    next();
  }
};
