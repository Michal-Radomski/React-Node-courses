import http from "http";
import url from "url";
import path from "path";
import querystring from "querystring";
import { Worker } from "worker_threads";

const server = http.createServer(async (req, res) => {
  res.write("Your request is being processed... \n");
  const query = url.parse(req.url as string).query;
  const n = Number(querystring.parse(query as string)["n"]);
  const sum = await findSum(n);
  res.end(`the sum is ${sum}`);
});

server.listen(3000, () => {
  console.log("server listening on port 3000");
});

function findSum(n: number) {
  return new Promise((resolve, reject) => {
    const worker: Worker = new Worker(path.resolve(__dirname, "./summation.js"), {
      workerData: { n },
    });
    // console.log("worker:", worker);

    worker.on("message", resolve);
    worker.on("error", reject);
  });
}
