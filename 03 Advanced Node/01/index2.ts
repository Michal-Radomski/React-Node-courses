// import os from "os";
// import fs from "fs";
import http from "http";
import url from "url";
import querystring from "querystring";

// process.env.UV_THREADPOOL_SIZE = String(os.cpus().length); // setting the thread pool to max number of cpus
// console.log("process.env.UV_THREADPOOL_SIZE:", process.env.UV_THREADPOOL_SIZE);

// const server = http.createServer((_req, res) => {
//   fs.readFile("addresses.json", (_err, data) => {
//     if (data) {
//       res.statusCode = 200;
//       res.end(data);
//     } else {
//       res.statusCode = 500;
//       res.end("error occurred");
//     }
//   });
// });

// server.listen(3000, () => {
//   console.log("server listening on port 3000");
// });

//* V1
// const server = http.createServer((req, res) => {
//   const query = url.parse(req.url as string).query as string;
//   // console.log("query:", query);
//   // console.log("req.url:", req.url);
//   const n = Number(querystring.parse(query)["n"]);

//   if (n > 10000) {
//     return res.end("Please enter a number less than 10,000");
//   }

//   let sum = 0;
//   for (let i = 0; i < n; i++) {
//     sum += i;
//   }
//   res.end(String(sum));
// });

// server.listen(3000, () => {
//   console.log("server listening on port 3000");
// });

//* V2 - Non Blocking Manner
const server = http.createServer((req, res) => {
  res.write("Your request is being processed... \n");
  const query = url.parse(req.url as string).query;
  const n = Number(querystring.parse(query as string)["n"]);
  findSum(n, (sum: number) => {
    res.end(`The sum is ${sum} \n`);
  });
});

server.listen(3000, () => {
  console.log("server listening on port 3000");
});

function findSum(n: number, sumCallBack: (sum: number) => void) {
  let sum = 0;
  function add(i: number, cb: { (sum: number): void }) {
    // console.log("cb.toString():", cb.toString());
    sum = sum + i;
    if (i === n) {
      return cb(sum);
    }
    setImmediate(add.bind(null, i + 1, cb));
  }

  add(1, sumCallBack);
}
