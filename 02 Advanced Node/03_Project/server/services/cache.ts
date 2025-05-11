import mongoose, { ObjectId } from "mongoose";
import { createClient } from "redis";

//* Redis
const client = createClient({
  url: `redis://:${process.env.RedisSecret}@${process.env.RedisHost}:${process.env.RedisPort}`,
});
// console.log("client:", client);

client.on("error", (err) => console.log("Redis Client Error", err));
client.on("connect", () => console.log("Connected to Redis-Server"));

client.connect();

//- Overwrite existing function - do wee need it???
// client.hGet = util.promisify(client.hGet);

const exec = mongoose.Query.prototype.exec;
// console.log({ exec });

// @ts-ignore
mongoose.Query.prototype.cache = function (options = {}) {
  // @ts-ignore
  this.useCache = true;
  // @ts-ignore
  this.hashKey = JSON.stringify(options.key || "");
  return this;
};

mongoose.Query.prototype.exec = async function () {
  // @ts-ignore
  if (!this.useCache) {
    return exec.apply(this, arguments as any);
  }
  client.on("error", (err: Error) => console.log("Redis Client Error:", err));
  // console.log("I'm about to run a query");
  // console.log(this.getQuery());
  // // @ts-ignore
  // console.log(this.mongooseCollection.name);

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      // @ts-ignore
      collection: this.mongooseCollection.name,
    })
  );
  // console.log("key:", key);

  // See if we have a value for 'key' in redis
  // @ts-ignore
  const cacheValue = await client.hGet(this.hashKey, key);
  // If we do, return that
  if (cacheValue) {
    // console.log("cacheValue:", cacheValue);
    // return JSON.parse(cacheValue);

    // const doc = new this.model(JSON.parse(cacheValue));
    // console.log("doc:", doc);

    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc) ? doc.map((document) => new this.model(document)) : new this.model(doc);
  }

  // Otherwise, issue the query and store the result in redis
  const result = await exec.apply(this, arguments as any);
  // console.log("result:", result);

  // @ts-ignore
  client.hSet(this.hashKey, key, JSON.stringify(result), "EX", 10);
  return result;
};

export const clearCache = (hashKey: ObjectId) => {
  client.del(JSON.stringify(hashKey));
};
