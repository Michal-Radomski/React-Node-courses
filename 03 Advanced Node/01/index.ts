// const startTime: [number, number] = process.hrtime(); // result in [seconds, nanoseconds]
// console.log("process.argv:", process.argv);
// const endTime: [number, number] = process.hrtime(startTime);

// console.log("endtime:", endTime, endTime?.[1] / 1000000); // Last number in milliseconds

// console.log("__filename, __dirname:", __filename, __dirname);

// console.log("module:", module);

// const req = require("module").wrapper.toString();
// console.log({ req });

// console.log("require.resolve:", require.resolve);

// console.log("require:", require);
// console.log("require.extensions:", require.extensions);

import os from "os";
import fs from "fs";
import http from "http";
import url from "url";
import queryString from "querystring";

console.log(`Platform: ${os.platform()}, Hostname: ${os.hostname()}`);
console.log(`CPUs: ${JSON.stringify(os.cpus())}`);

const cpuInfo: string = JSON.stringify(os.cpus());
// const filename = "cpu.txt";

// if (fs.existsSync(filename)) {
//   fs.readFile(filename, "utf8", (err, data) => {
//     if (err) throw err;
//     console.log("File content:", data);
//   });
// } else {
//   fs.writeFile(filename, cpuInfo, (err) => {
//     if (err) console.error(err);
//     console.log("CPU information written to file.");
//   });
// }

// (async (): Promise<void> => {
//   try {
//     const filename = "cpu.txt";
//     if (fs.existsSync(filename)) {
//       const data:Buffer<ArrayBufferLike> = await fs.promises.readFile("cpu.txt");
//       console.log(data.toString());
//     } else {
//       await fs.promises.writeFile(filename, JSON.stringify(cpuInfo));
//     }
//   } catch (error) {
//     console.log("error:", error);
//   }
// })();

(async (): Promise<void> => {
  try {
    const filename = "cpu.txt";
    if (fs.existsSync(filename)) {
      const readableStream: fs.ReadStream = fs.createReadStream(filename);
      readableStream.on("data", (chunk: string | Buffer<ArrayBufferLike>) => {
        console.log(chunk.toString());
      });
      readableStream.on("end", () => {
        console.log("stream completed the reading. ");
      });
      readableStream.on("error", (error) => {
        console.log(error);
      });
    } else {
      await fs.promises.writeFile(filename, JSON.stringify(cpuInfo));
    }
  } catch (error) {
    console.log(error);
  }
})();

//* http://localhost:3000/?name=michal
http
  .createServer((req, res) => {
    const path = url.parse(req.url as string);
    const query = queryString.parse(path.query as string);
    console.log({ path, query });

    if (path.pathname == "/") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write(`Hello ${query["name"]}`);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.write("Not found");
    }
    res.end();
  })
  .listen(3000);

console.log("server is listening on port 3000");

//* Example of setImmediate in TypeScript
(function example(): void {
  console.log("Start");

  setImmediate(() => {
    console.log("Executed in setImmediate callback");
  });

  console.log("End");
})();
