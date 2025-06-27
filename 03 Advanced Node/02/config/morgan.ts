import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import morgan from "morgan";

import config from "./config";

morgan.token("message", (_req: Request, res: Response) => res.locals.errorMessage || "");
const getIPFormat = () => (config.env === "production" ? ":remote-addr - " : "");

// eslint-disable-next-line security/detect-non-literal-fs-filename
const accessLogStream: fs.WriteStream = fs.createWriteStream(path.join(__dirname, "..", "logs/access.log"), { flags: "a" });

const successResponseFormat: string = `${getIPFormat()} :method :url :status :response-time ms :user-agent :date`;
const successHandler = morgan(successResponseFormat, {
  stream: accessLogStream,
  skip: (_req, res) => res.statusCode >= 400,
});

const errorResponseFormat: string = `${getIPFormat()} :method :url :status :response-time ms :user-agent :date - error-message: :message`;
const errorHandler = morgan(errorResponseFormat, {
  stream: accessLogStream,
  skip: (_req, res) => res.statusCode < 400,
});

export default { successHandler, errorHandler };
