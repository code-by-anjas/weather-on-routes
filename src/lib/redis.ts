import { Redis } from "@upstash/redis";
import { configs } from "./config";

export const redis = new Redis({
  url: configs.redis.url,
  token: configs.redis.token,
});
