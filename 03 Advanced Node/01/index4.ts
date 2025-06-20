import fs from "fs";
import chain from "stream-chain";
import { parser } from "stream-json";
import { streamArray } from "stream-json/streamers/StreamArray";
import { pick } from "stream-json/filters/Pick";

// Creating a JSON streaming pipeline
const pipeline = chain([
  fs.createReadStream("citylots.json"),
  parser(),
  pick({ filter: "features" }), // Extracting relevant data
  streamArray(), // Streaming array of JSON objects
]);

// Handling data events in the pipeline
pipeline.on("data", (data) => {
  console.log("data:", data);
});
