import http from "http";
import fs from "fs";
import mongoose from "mongoose";

// import subscribers from "./subscribers";
// import EventEmitter from "./utils/EventEmitter";
import config from "./config/config";
import app from "./server/server";
import logger from "./config/logger";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const redisClient = require("./config/redis");

(async function (): Promise<void> {
  //* Mongo DB
  mongoose.set("strictQuery", true);
  await mongoose
    // .connect(process.env.DB_CONNECTION as string, {})
    .connect(config.dbConnection, {})
    .then((con: { connection: { host: string } }) => {
      logger.info(`MongoDB Database connected with HOST: ${con.connection.host}`);
    })
    .catch((error: string) => logger.error("Mongo DB Error => ", error));

  await redisClient.connect().catch((error: Error) => console.log("error:", error));

  fs.access("uploads", fs.constants.F_OK, async (err) => {
    if (err) {
      await fs.promises.mkdir("uploads");
    }
  });

  //* Port
  // const portHTTP = (process.env.PORT || 5000) as number;
  const portHTTP = (config.port || 5000) as number;

  const httpServer = await http.createServer(app);
  //* IPv4
  httpServer.listen({ port: portHTTP, host: "127.0.0.1" }, () => {
    logger.info(`🚀 Server is listening at http://localhost:${portHTTP}`);
    // For testing only
    console.log("Current Time:", new Date().toLocaleTimeString());
  });

  // Todo: fix!
  // Object.keys(subscribers).forEach((eventName) => {
  //   // eslint-disable-next-line security/detect-object-injection
  //   EventEmitter.on(eventName, subscribers[eventName]);
  // });

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
})();
