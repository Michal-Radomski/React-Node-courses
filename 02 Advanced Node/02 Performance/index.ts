// process.env.UV_THREADPOOL_SIZE = 1 as any;

import http from "http";
// import cluster from "cluster";
import express, { Express, Request, Response } from "express";
// import crypto from "crypto";
// const { Worker } = require('worker_threads');
import { Worker } from "worker_threads";

//* Clustering
// // Is the file being executed in master mode?
// if (cluster.isMaster) {
//   // Cause index.ts to be executed *again* bu in child mode
//   cluster.fork(); //+ number of children = number of cors!
//   cluster.fork();
//   cluster.fork();
//   cluster.fork();
//   // cluster.fork();
//   // cluster.fork();
//   // cluster.fork();
//   // cluster.fork();
//   // cluster.fork();
// } else {
//   // I'm as child

//   // The server
//   const app: Express = express();

//   // function doWork(duration: number) {
//   //   const start = Date.now();
//   //   while (Date.now() - start < duration) {
//   //     //* do nothing
//   //   }
//   // }

//   app.get("/", (req: Request, res: Response) => {
//     console.log("req.ip:", req.ip);
//     // doWork(5000);

//     crypto.pbkdf2("a", "b", 100000, 512, "sha512", (_err: Error | null, _derivedKey: Buffer) => {
//       res.send("Hi there!");
//     });
//   });

//   app.get("/fast", (req: Request, res: Response) => {
//     console.log("req.ip:", req.ip);
//     res.send("This was fast!");
//   });

//   const port = 3000;

//   const server = http.createServer(app);
//   server.listen({ port: port }, () => {
//     console.log(`Server is listening at http://localhost:${port}`);
//     // For testing only
//     console.log("Current Time:", new Date().toLocaleTimeString());
//   });
// }

// The server
const app: Express = express();

//* Worker_Threads
app.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  const worker = new Worker("./worker.js");
  // console.log({ worker });

  worker.on("message", function (message) {
    console.log({ message });
    res.send("" + message);
  });

  worker.postMessage("start!");
});

app.get("/fast", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("This was fast!");
});

const port = 3000;

const server = http.createServer(app);
server.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
