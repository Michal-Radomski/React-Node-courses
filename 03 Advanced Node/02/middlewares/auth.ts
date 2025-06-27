/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { NextFunction, Request, RequestHandler, Response } from "express";
import passport from "passport";
import httpStatus from "http-status";

import ApiError from "../utils/ApiError";

const verifyCallBack =
  (req: Request, resolve: Function, reject: Function) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (err: Error, user: Express.User, info: any): Promise<void> => {
    if (err || info || !user) {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, "please authenticate"));
    }

    req.user = user;
    resolve();
  };

const auth: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  return new Promise((resolve, reject) => {
    passport.authenticate("jwt", { session: false }, verifyCallBack(req, resolve, reject))(req, res, next);
  })
    .then(() => next())
    .catch((error) => next(error));
};

export default auth;
