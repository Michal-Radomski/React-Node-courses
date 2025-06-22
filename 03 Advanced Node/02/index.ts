import path from "path";
import http from "http";
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import httpStatus from "http-status";
// import * as dotenv from "dotenv";
// dotenv.config();

import config from "./config/config";
import { errorConverter, errorHandler } from "./middlewares/error";
import ApiError from "./utils/ApiError";
//* Import routes
import blogRouter from "./routes/blog.route";

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
app.use(morgan("combined"));
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

//* Favicon
app.get("/favicon.ico", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/favicon.svg"));
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

//* Mongo DB
mongoose.set("strictQuery", true);
mongoose
  // .connect(process.env.DB_CONNECTION as string, {})
  .connect(config.dbConnection, {})
  .then((con: { connection: { host: string } }) => {
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
  })
  .catch((error: string) => console.log("Mongo DB Error => ", error));

//* Port
// const portHTTP = (process.env.PORT || 5000) as number;
const portHTTP = (config.port || 5000) as number;

const httpServer = http.createServer(app);
//* IPv4
httpServer.listen({ port: portHTTP, host: "127.0.0.1" }, () => {
  console.log(`🚀 Server is listening at http://localhost:${portHTTP}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});

const exitHandler = (): void => {
  if (httpServer) {
    httpServer.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unExpectedErrorHandler = (error: Error): void => {
  console.log(error);
  exitHandler();
};

process.on("uncaughtException", unExpectedErrorHandler);
process.on("unhandledRejection", unExpectedErrorHandler);
