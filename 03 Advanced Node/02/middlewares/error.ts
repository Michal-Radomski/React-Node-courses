import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import httpStatus from "http-status";

import config from "../config/config";
import ApiError from "../utils/ApiError";
import logger from "../config/logger";

interface CustomError extends Error {
  isOperational: boolean;
  statusCode: number;
}

export const errorConverter = (err: CustomError, _req: Request, _res: Response, next: NextFunction): void => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, error.stack);
  }
  next(error);
};

export const errorHandler: ErrorRequestHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let { statusCode, message } = err;

  if (config.env === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[statusCode as keyof typeof httpStatus] as string;
  }

  const response = {
    error: true,
    code: statusCode,
    message,
    ...(config.env === "development" && { stack: err.stack }),
  };

  res.locals.errorMessage = message;

  if (config.env === "development") {
    logger.error(err);
  }
  res.status(statusCode).send(response);
};
