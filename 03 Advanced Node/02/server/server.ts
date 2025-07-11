import path from "path";
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
// import morgan from "morgan";
import compression from "compression";
import httpStatus from "http-status";
import morganMiddleware from "../config/morgan";
import passport from "passport";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { xss } = require("express-xss-sanitizer");
import mongoSanitize from "express-mongo-sanitize";

import { errorConverter, errorHandler } from "../middlewares/error";
import ApiError from "../utils/ApiError";
//* Import routes
import blogRouter from "../routes/blog.route";
import authRouter from "../routes/auth.route";
import commentRouter from "../routes/comment.route";
//* Other staff import
import { jwtStrategy } from "../config/passport";
import config from "../config/config";

const app: Express = express();

// const corsOptions = {
//   origin: true,
//   methods: ["POST", "GET", "OPTIONS", "PUT", "DELETE"],
//   preflightContinue: false,
//   optionsSuccessStatus: 200,
//   credentials: true,
//   allowedHeaders: ["Content-Type", "Authorization", "Accept"], // Specify
// };

//* Middleware
// app.use(cors(corsOptions)); //* V1
//* V2
if (config.env === "production") {
  app.use(cors({ origin: "url" }));
  app.options("*", cors({ origin: "url" })); //* Pass the CORS preflight response to the next handler
} else {
  // Enabling all cors
  app.use(cors());
  app.options("*", cors()); //* Pass the CORS preflight response to the next handler
}
app.use(bodyParser.json({ limit: "1kb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "1kb" }));
// app.use(morgan("combined")); //* V1
app.use(morganMiddleware.successHandler); //* V2
app.use(morganMiddleware.errorHandler); //* V2
//* Security
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//     crossOriginResourcePolicy: false,
//     crossOriginEmbedderPolicy: false,
//     crossOriginOpenerPolicy: false,
//   })
// ); //* V1
app.use(helmet.contentSecurityPolicy(config.cspOptions)); //* V2
// Set X-Frame-Options to SAMEORIGIN
app.use(helmet.frameguard({ action: "sameorigin" }));
app.use(helmet.noSniff());
// Compress all responses
app.use(compression({ level: 6 }));
//* XSS
const optionsXSS = {};
app.use(xss(optionsXSS));

//* Cannot assign to read only property 'query' of object '#<IncomingMessage>'
app.use((req, _res, next) => {
  Object.defineProperty(req, "query", {
    ...Object.getOwnPropertyDescriptor(req, "query"),
    value: req.query,
    writable: true,
  });

  next();
});
app.use(mongoSanitize());

//* Passport
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

//* Route Middleware
app.use(blogRouter);
app.use(authRouter);
app.use(commentRouter);

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

//* Path not found 404
app.use((_req, _res, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

//* Error Handler
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter); // Add the error converter before the error handler
app.use(errorHandler); // Add the error handler

export default app;
