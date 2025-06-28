import http from "http";
import fs from "fs";
import mongoose from "mongoose";

import config from "./config/config";
import app from "./server/server";
import logger from "./config/logger";
// import subscribers from "./subscribers";
// import EventEmitter from "./utils/EventEmitter";

//* Mongo DB
mongoose.set("strictQuery", true);
mongoose
  // .connect(process.env.DB_CONNECTION as string, {})
  .connect(config.dbConnection, {})
  .then((con: { connection: { host: string } }) => {
    logger.info(`MongoDB Database connected with HOST: ${con.connection.host}`);
  })
  .catch((error: string) => logger.error("Mongo DB Error => ", error));

//* Port
// const portHTTP = (process.env.PORT || 5000) as number;
const portHTTP = (config.port || 5000) as number;

const httpServer = http.createServer(app);
//* IPv4
httpServer.listen({ port: portHTTP, host: "127.0.0.1" }, () => {
  logger.info(`🚀 Server is listening at http://localhost:${portHTTP}`);
  // For testing only
  logger.info("Current Time:", new Date().toLocaleTimeString());
});

// Todo: fix!
// Object.keys(subscribers).forEach((eventName) => {
//   // eslint-disable-next-line security/detect-object-injection
//   EventEmitter.on(eventName, subscribers[eventName]);
// });

fs.access("uploads", fs.constants.F_OK, async (err) => {
  if (err) {
    await fs.promises.mkdir("uploads");
  }
});

const exitHandler = (): void => {
  if (httpServer) {
    httpServer.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unExpectedErrorHandler = (error: Error): void => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unExpectedErrorHandler);
process.on("unhandledRejection", unExpectedErrorHandler);
process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (httpServer) {
    httpServer.close();
  }
});
