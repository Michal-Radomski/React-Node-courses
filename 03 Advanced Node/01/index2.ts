import os from "os";
import fs from "fs";
import http from "http";

process.env.UV_THREADPOOL_SIZE = String(os.cpus().length); // setting the thread pool to max number of cpus
console.log("process.env.UV_THREADPOOL_SIZE:", process.env.UV_THREADPOOL_SIZE);

const server = http.createServer((_req, res) => {
  fs.readFile("addresses.json", (_err, data) => {
    if (data) {
      res.statusCode = 200;
      res.end(data);
    } else {
      res.statusCode = 500;
      res.end("error occurred");
    }
  });
});

server.listen(3000, () => {
  console.log("server listening on port 3000");
});
