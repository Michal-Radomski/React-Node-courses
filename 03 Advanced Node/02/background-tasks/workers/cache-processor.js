/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const redisClient = require("../../config/redis");

module.exports = async (job) => {
  const blogs = JSON.stringify(job.data.blogs);
  await redisClient.connect();
  await redisClient.set("recent-blogs", blogs);
  Promise.resolve(blogs);
};
