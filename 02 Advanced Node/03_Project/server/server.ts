// console.log("process.env.NODE_ENV:", process.env.NODE_ENV);

import path from "path";
import http from "http";

import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Response, Request } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import passport from "passport";

// Import config
const keys = require("./config/keys");
// console.log({ keys });

// Import routes
import authRouter from "./routes/authRouter";
import blogRouter from "./routes/blogRouter";
import uploadRouter from "./routes/uploadRouter";

// Passport config
require("./services/passportConfig");
// Redis cache
require("./services/cache");

const app: Express = express();

// Middlewares
app.use(cors());
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

// Passport
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Route middleware
app.use("", authRouter);
app.use("", blogRouter);
app.use("", uploadRouter);

// Mongo DB
// mongoose.Promise = global.Promise; //* Needed for mongoose v4!
mongoose
  .connect(keys.mongoURI as string, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((con: { connection: { host: string } }) => {
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
  })
  .catch((error: string) => console.log("Mongo DB Error => ", error));

//* Test route
// app.get("/", (req: Request, res: Response) => {
//   console.log("req.ip:", req.ip);
//   res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
// }) as express.RequestHandler;

//* Serve static assets in production
if (["production", "ci"].includes(process.env.NODE_ENV as string)) {
  console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
  // Set static folder
  app.use(express.static("client/build"));

  app.get("/*", (req: Request, res: Response) => {
    console.log("req.ip:", req.ip);
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Port
const port = (process.env.PORT || 5000) as number;

const server = http.createServer(app);
server.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});

//* Generate JWT secret string
// const JWT_Secret = require("crypto").randomBytes(64).toString("hex");
// console.log({ JWT_Secret }, JWT_Secret.length);

//^ Redis
// const redis = require("redis");
// // console.log("redis:", redis);

// const client = redis.createClient({
//   url: `redis://:${process.env.RedisSecret}@${process.env.RedisHost}:${process.env.RedisPort}`,
// });
// // console.log({ client });

// client.on("error", (err: Error) => console.log("Redis Client Error:", err));
// client.on("connect", () => console.log("Connected to Redis-Server"));

// const colorValues = {
//   spanish: {
//     red: "rojo",
//     orange: "naranja",
//     blue: "azul",
//   },
//   german: {
//     red: "rot",
//     orange: "orange",
//     blue: "blau",
//   },
// };

// const connectRedis = async () => {
//   await client.connect();

//   // await client.set("key", "value");
//   // const value = await client.get("key");
//   // await console.log({ value });

//   // await client.hSet("german", "red", "rot");
//   // const values = await client.hGetAll("german");
//   // await console.log({ values });
//   // const value2 = await client.hGet("german", "red");
//   // await console.log({ value2 });

//   await client.set("colorValues", JSON.stringify(colorValues));
//   const colorValuesData = await client.get("colorValues");
//   const colorValuesDataParsed = await JSON.parse(colorValuesData);
//   await console.log("colorValuesDataParsed:", colorValuesDataParsed);

//   await client.set("key", "value", {
//     EX: 10,
//     NX: true,
//   });
//   const key = await client.get("key");
//   console.log({ key });

// //* Clear Redis
// // client.flushAll();

//   await client.disconnect();
// };

// connectRedis();

//^ MongoDB native query
// import { MongoClient, ObjectId } from "mongodb";

// const url = keys.mongoURI as string;
// const client = new MongoClient(url);

// async function getData() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log("Connected successfully to server");
//   const db = client.db();
//   const collection = db.collection("blogs");
//   const blogs = collection.find({ _user: new ObjectId("64c790396bd1e7588609b0e6") }).toArray();
//   return blogs;
// }

// getData()
//   .then((data) => console.log("data:", data))
//   .catch((error) => console.error(error))
//   .finally(() => client.close());

//^ Session
// const session = process.env.myGoogleIdCookie;
// const Buffer = require("safe-buffer").Buffer;
// // console.log("Buffer:", Buffer);
// const info = Buffer.from(session, "base64").toString("utf8");
// console.log("info:", info);

//^ Session Sig
// const session = process.env.myGoogleIdCookie;
// const Keygrip = require("keygrip");

// const keygrip = new Keygrip([process.env.Dev_cookieKey]);
// // console.log({ keygrip });
// const sessionSig = keygrip.sign("session=" + session);
// // console.log({ sessionSig }); //* equals session.sig

// const sessionVerify = keygrip.verify("session=" + session, sessionSig);
// console.log({ sessionVerify }); //* equals true or false
