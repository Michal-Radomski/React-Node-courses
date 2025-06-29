import ImageProcessorQueue from "./queues/image-processor";
import CacheProcessorQueue from "./queues/cache-processor";
// import { startCacheProcessor, startImageProcessor } from "./workers";

export const ImageProcessor = {
  Queue: ImageProcessorQueue,
  // startWorker: startImageProcessor,
};

export const CacheProcessor = {
  Queue: CacheProcessorQueue,
  // startWorker: startCacheProcessor,
};
