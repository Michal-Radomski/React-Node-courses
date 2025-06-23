import path from "path";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
// import morgan from "morgan";
import compression from "compression";
import httpStatus from "http-status";
import morganMiddleware from "../config/morgan";

import { errorConverter, errorHandler } from "../middlewares/error";
import ApiError from "../utils/ApiError";
//* Import routes
import blogRouter from "../routes/blog.route";
import authRouter from "../routes/auth.route";

const app: Express = express();

const corsOptions = {
  origin: true,
  methods: ["POST", "GET", "OPTIONS", "PUT", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Accept"], // Specify
};

//* Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(morgan("combined")); //* V1
app.use(morganMiddleware.successHandler); //* V2
app.use(morganMiddleware.errorHandler); //* V2
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);
// Compress all responses
app.use(compression({ level: 6 }));

//* Route Middleware
app.use(blogRouter);
app.use(authRouter);

//* Favicon
app.get("/favicon.ico", (_req: Request, res: Response) => {
  // console.log('path.join(__dirname + "./../favicon.svg"):', path.join(__dirname + "./../favicon.svg"));
  res.sendFile(path.join(__dirname + "./../favicon.svg"));
});
//* Test route
app.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
});

//* Error Handler
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter); // Add the error converter before the error handler
app.use(errorHandler); // Add the error handler

export default app;
