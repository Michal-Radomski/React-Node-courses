import http from "http";
import mongoose from "mongoose";

import config from "./config/config";
import app from "./server/server";
import logger from "./config/logger";

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
  logger.info(`server listening on port ${config.port}`);
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
process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  if (httpServer) {
    httpServer.close();
  }
});
