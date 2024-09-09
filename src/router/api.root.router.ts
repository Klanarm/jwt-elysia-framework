import Elysia from "elysia";
import { apikeysHandler } from "../handlers/apikey.handle";
import { userHandler } from "../handlers/user.handle";
import { authenticationHandler } from "../handlers/authentication.handle";
import jwt from "@elysiajs/jwt";
import bearer from "@elysiajs/bearer";
import { responseFormat } from "../library/response.format";
import { swaggerExampleResponse } from "../library/swagger";

export const apiRootRouters = new Elysia({ prefix: "/api/v1" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET_KEY,
    })
  )
  .use(bearer())
  .guard(
    {
      beforeHandle: apikeysHandler.apikeyAuthentication,
      headers: apikeysHandler.validateApikey,
      detail: {
        tags: ["user authentication"],
      },
    },
    (apikey) =>
      apikey
        .post("/login", userHandler.loginUser, {
          body: userHandler.userValidate,
          detail: {
            responses: swaggerExampleResponse({ token: "string" }),
          },
        })
        .post("/register", userHandler.createUser, {
          body: userHandler.userValidate,
          detail: {
            responses: swaggerExampleResponse({}),
          },
        })
  )
  .guard(
    { tags: ["user"], headers: authenticationHandler.validateAuthentication },
    (user) =>
      user.resolve(authenticationHandler.AuthenticationToken).get(
        "/information",
        ({ request, user_details }) => {
          return responseFormat(request.method);
        },
        {
          detail: {
            responses: swaggerExampleResponse({
              id: "string",
              username: "string",
            }),
          },
        }
      )
  );
