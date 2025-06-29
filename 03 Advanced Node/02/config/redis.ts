import { createClient, RedisClientType } from "redis";

import logger from "./logger";
import config from "./config";

const redisClient: RedisClientType = createClient({
  readonly: false,
  url: `redis://:${config.redis.pass}@${config.redis.host}:${config.redis.port}`,
});

redisClient.on("connect", (): void => console.log("Connected to Redis-Server"));
redisClient.on("ready", (): void => console.log("🟥 Redis client connected and ready..."));
redisClient.on("reconnecting", (): void => console.log("Attempting to reconnect to Redis..."));
redisClient.on("error", (error) => logger.error(error));
redisClient.on("end", (): void => console.log("Redis client disconnected"));

module.exports = redisClient; //* Default commonjs export
