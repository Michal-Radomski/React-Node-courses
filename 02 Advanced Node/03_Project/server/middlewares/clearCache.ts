import { NextFunction, Response } from "express";

import { clearCache } from "../services/cache";
import { CustomRequest } from "../routes/blogRouter";

export const cleanCache = async (req: CustomRequest, _res: Response, next: NextFunction): Promise<void> => {
  await next();
  clearCache(req.user!.id!);
};
