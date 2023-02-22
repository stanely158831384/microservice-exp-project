// const mongoose = require("mongoose");
// const redis = require("redis");
// const util = require("util");

import mongoose from "mongoose";
import redis from "redis";
import util from "util";

if (!process.env.REDIS_URL) {
  throw new Error("MONGO_URI must be defined");
}

const redisUrl = process.env.REDIS_URL;
const client = redis.createClient(redisUrl);
client.hget = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");
  return this;
};

mongoose.Query.prototype.exec = async function () {
  console.log("argument: ", arguments);
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );

  const cacheValue = await client.hget(this.hashKey, key);

  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc)
      ? doc.map((d) => this.model(d))
      : new this.model(doc);
  }
  const result = await exec.apply(this, arguments);
  client.hset(this.hashKey, key, JSON.stringify(result), "EX", 5000);
  return result;
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  },
};
