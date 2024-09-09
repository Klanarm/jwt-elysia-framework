import * as dotenv from "dotenv";
dotenv.config();

import { Elysia, NotFoundError, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors, HTTPMethod } from "@elysiajs/cors";
import serverTimingConfig from "./library/serverTiming";
import { AuthenticationError } from "./exceptions/AuthenticationError";
import { AuthorizationError } from "./exceptions/AuthorizationError";
import { InvariantError } from "./exceptions/InvariantError";
import { RateLimitError } from "./exceptions/RateLimitError";
import { handleErrors } from "./handlers/error.handle";
import { loggingRequest } from "./library/elysiaLogging";
import { swaggerConfig } from "./library/swagger";
import ratelimitConfig from "./library/rateLimit";
import { apiRootRouters } from "./router/api.root.router";
import { logStartupInfo } from "./library/logStartupInfo";
import { initDB } from "./database/sequelize.config";
import { loginError } from "./exceptions/loginError";
import { DuplicateUserError } from "./exceptions/DuplicateUserError";
import { versionRouters } from "./router/version.router";
import { ping, redis } from "./library/redis";
import staticPlugin from "@elysiajs/static";

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: JSON.parse(process.env.CORS_METHODS as string) as HTTPMethod[],
  allowedHeaders: process.env.CORS_HEADERS,
  credentials: process.env.CORS_CREDENTIALS === "true",
};

export const app = new Elysia()
  .onStart(({ server }) => {
    logStartupInfo(server.port);
    initDB();
    ping();
    redis.flushdb();
  })
  .use(staticPlugin())
  .get("/favicon.ico", Bun.file("public/favicon/favicon.ico"))
  .use(swagger(swaggerConfig))
  .use(ratelimitConfig)
  .use(cors(corsOptions))
  .use(serverTimingConfig)
  .error("DUPLICATE_USER", DuplicateUserError)
  .error("AUTHENTICATION_ERROR", AuthenticationError)
  .error("AUTHORIZATION_ERROR", AuthorizationError)
  .error("INVARIANT_ERROR", InvariantError)
  .error("TOO_MANY_REQUEST", RateLimitError)
  .error("NOT_FOUND", NotFoundError)
  .error("LOGIN_ERROR", loginError)
  .onError((params) => handleErrors(params))
  .onRequest(({ request }) => {
    const url = new URL(request.url);
    loggingRequest.logDetails(
      request.method,
      url.pathname,
      "   ",
      false,
      undefined
    );
  })
  .onAfterResponse(async ({ set, request, path }) => {
    const serverTiming = parseFloat(
      set.headers["Server-Timing"].match(/dur=(\d+(\.\d+)?)/)[1]
    );

    await loggingRequest.logDetails(
      request.method,
      path,
      set.status,
      true,
      serverTiming.toFixed(2)
    );
  })
  .ws("/ws", {
    open(ws) {
      ws.subscribe("asdf");
      console.log("Open Connection:", ws.id);
    },
    close(ws) {
      console.log("Closed Connection:", ws.id);
      app.server.publish("asdf", ws.id);
    },
    message(ws, message) {
      ws.publish("asdf", message);
    },
  })
  .get("/publish/:publish", ({ params: { publish: text } }) => {
    app.server.publish("asdf", text);
    return text;
  })
  .use(versionRouters)
  .use(apiRootRouters)
  .listen(process.env.APP_PORT);

export type ElysiaApp = typeof app;
