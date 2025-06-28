import path from "path";
import { Worker } from "bullmq";

import config from "../../config/config";
import logger from "../../config/logger";

export const start = async (): Promise<void> => {
  const processorPath: string = path.join(__dirname, "./image-processor.js");

  const ImageProcessorWorker = new Worker("ImageProcessor", processorPath, {
    connection: {
      host: config.redis.host,
      port: config.redis.port,
      password: config.redis.pass,
    },
    // removeOnComplete: true as unknown as KeepJobs,
    autorun: true,
    concurrency: 3,
  });

  ImageProcessorWorker.on("completed", (job) => logger.info(`Job ${job.id} completed`));
};
