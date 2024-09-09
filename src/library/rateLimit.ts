import type { Generator, Options } from "elysia-rate-limit";
import { RateLimitError } from "../exceptions/RateLimitError";
import { rateLimit } from "elysia-rate-limit";

const keyGenerator: Generator<{ ip: string }> = async (req, server) => {
  const ip = Bun.hash(req.headers.get("CF-Connecting-IP")).toString() || "1";
  return ip;
};

const ratelimitConfig = {
  duration: parseInt(process.env.RATELIMITER_DURATION),
  max: parseInt(process.env.RATELIMITER_MAX),
  errorResponse: new RateLimitError("TOO_MANY_REQUEST"),
  generator: keyGenerator,
};

export default rateLimit(ratelimitConfig);
