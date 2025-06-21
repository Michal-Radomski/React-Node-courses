import { NextFunction, Request, Response, ErrorRequestHandler } from "express";

import config from "../config/config";

interface CustomError extends Error {
  statusCode: number;
}

export const errorHandler: ErrorRequestHandler = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  const { statusCode, message } = err;

  const response = {
    error: true,
    code: statusCode,
    message,
    ...(config.env === "development" ? { stack: err.stack } : null),
  };

  if (config.env === "development") {
    console.log({ err });
  }

  res.status(statusCode).send(response);
};
