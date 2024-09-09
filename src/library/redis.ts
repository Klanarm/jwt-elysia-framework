// redisClient.ts
import colors from "colors";
import Redis, { Redis as RedisClientType } from "ioredis";
import { logsRedisUtil } from "./logStartupInfo";

const redisUrl = process.env.REDIS_URL; // Your Redis connection string
if (!redisUrl) {
  throw new Error("REDIS_URL environment variable is not set");
}

export const redis = new Redis(redisUrl);

redis.on("connect", async () => {
  logsRedisUtil({ host: redis.options.host, port: redis.options.port }); // logs
});
redis.on("error", (err) => {
  console.error(colors.red("Redis connection error"), err);
});

export async function ping() {
  try {
    const pong = await redis.ping();
    return pong === "PONG";
  } catch (error) {
    return false;
  }
}
