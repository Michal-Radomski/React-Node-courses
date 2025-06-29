import { Queue } from "bullmq";

import config from "../../config/config";

const CacheProcessorQueue = new Queue("Cache", {
  connection: {
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.pass,
  },
});

export default CacheProcessorQueue;
