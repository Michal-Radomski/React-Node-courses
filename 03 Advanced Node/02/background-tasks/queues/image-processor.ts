import { Queue } from "bullmq";

import config from "../../config/config";

const ImageProcessorQueue = new Queue("ImageProcessor", {
  connection: {
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.pass,
  },
});

export default ImageProcessorQueue;
