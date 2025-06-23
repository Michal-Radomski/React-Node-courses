import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";

import { catchAsync } from "../utils/catchAsync";
import { createUser } from "../services/user.service";

export const register: RequestHandler = catchAsync(async (req: Request, res: Response): Promise<void> => {
  // Create a user
  const user = await createUser(req.body);
  res.status(httpStatus.CREATED).send({ user: user });

  // Generate token
});
