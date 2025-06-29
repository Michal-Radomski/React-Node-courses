import path from "path";
import { Worker } from "bullmq";

import config from "../../config/config";
import logger from "../../config/logger";

// export const startImageProcessor = async (): Promise<void> => {
//   const processorPath: string = path.join(__dirname, "./image-processor.js");

//   const ImageProcessorWorker = new Worker("ImageProcessor", processorPath, {
//     connection: {
//       host: config.redis.host,
//       port: config.redis.port,
//       password: config.redis.pass,
//     },
//     // removeOnComplete: true as unknown as KeepJobs,
//     autorun: true,
//     concurrency: 3,
//   });

//   ImageProcessorWorker.on("completed", (job) => logger.info(`Image job ${job.id} completed`));
// };

// export const startCacheProcessor = async (): Promise<void> => {
//   const processorPath: string = path.join(__dirname, "./cache-processor.js");

//   const CacheProcessorWorker = new Worker("Cache", processorPath, {
//     connection: {
//       host: config.redis.host,
//       port: config.redis.port,
//       password: config.redis.pass,
//     },
//   });

//   CacheProcessorWorker.on("completed", (job) => logger.info(`Cache job ${job.id} completed`));
// };

export const createWorker = async (name: string, filename: string): Promise<void> => {
  const processorPath: string = path.join(__dirname, filename);
  const worker = new Worker(name, processorPath, {
    connection: {
      host: config.redis.host,
      port: config.redis.port,
      password: config.redis.pass,
    },
  });
  worker.on("completed", (job) => logger.info(`${job.name} with id ${job.id} is completed`));
};
