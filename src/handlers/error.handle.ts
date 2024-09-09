import { Serve } from "bun";
import { loggingRequest } from "../library/elysiaLogging";
import { RouteSchema } from "elysia";

export const handleErrors = async ({ code, error, set, request, path }) => {
  if (code == "VALIDATION") {
    error.status = 400;
    let resBody = {
      res_code: "4000",
      res_message: "VALIDATION_ERROR",
      res_data: [] as { path: string; message: string[]; on: string }[],
    };

    if (process.env.NODE_ENV == "localhost") {
      const pathMap = new Map<string, string[]>();
      error.all.forEach((v: { path: string; message: string; on: string }) => {
        if (pathMap.has(v.path)) {
          pathMap.get(v.path)!.push(v.message);
        } else {
          pathMap.set(v.path, [v.message]);
        }
      });

      resBody.res_data = Array.from(pathMap, ([path, message]) => ({
        path,
        on: error.type,
        message,
      }));
    }
    error.body = resBody;
  }
  if (code == "NOT_FOUND") {
    error.status = 404;
    error.body = {
      res_code: "4004",
      res_message: "NOT_FOUND",
      res_data: {},
    };
  }

  set.status = error.status;

  return error.body;
  // switch (code) {
  //   case "VALIDATION":
  //     set.status = 400;
  //     resBody = {
  //       res_code: "4000",
  //       res_message: "VALIDATION_ERROR",
  //       res_data: [] as { path: string; message: string[]; on: string }[],
  //     };

  //     const pathMap = new Map<string, string[]>();
  //     error.all.forEach((v: { path: string; message: string; on: string }) => {
  //       if (pathMap.has(v.path)) {
  //         pathMap.get(v.path)!.push(v.message);
  //       } else {
  //         pathMap.set(v.path, [v.message]);
  //       }
  //     });

  //     resBody.res_data = Array.from(pathMap, ([path, message]) => ({
  //       path,
  //       on: error.type,
  //       message,
  //     }));
  //     break;
  //   case "LOGIN_ERROR":
  //     set.status = 400;
  //     resBody = {
  //       res_code: "4010",
  //       res_message: "LOGIN_ERROR",
  //       res_data: error.message,
  //     };
  //     break;
  //   case "TOO_MANY_REQUEST":
  //     set.status = 429;
  //     resBody = {
  //       res_code: "4029",
  //       res_message: "TOO_MANY_REQUEST",
  //       res_data: {},
  //     };
  //     break;
  //   case "AUTHENTICATION_ERRORAAAA":
  //     set.status = 401;
  //     resBody = {
  //       res_code: "4001",
  //       res_message: "AUTHENTICATION_ERROR",
  //       res_data: error.message,
  //     };
  //     break;
  //   case "AUTHORIZATION_ERROR":
  //     set.status = 403;
  //     resBody = {
  //       res_code: "4003",
  //       res_message: "AUTHORIZATION_ERROR",
  //       res_data: {},
  //     };
  //     break;
  //   case "INVARIANT_ERROR":
  //     set.status = 403;
  //     resBody = {
  //       res_code: "4003",
  //       res_message: "INVARIANT_ERROR",
  //       res_data: error.message,
  //     };
  //     break;
  //   case "NOT_FOUND":
  //     set.status = 404;
  //     resBody = {
  //       res_code: "0404",
  //       res_message: "NOT_FOUND",
  //       res_data: {},
  //     };
  //     break;
  //   case "INTERNAL_SERVER_ERROR":
  //     set.status = 500;
  //     resBody = {
  //       res_code: "5000",
  //       res_message: "INTERNAL_SERVER_ERROR",
  //       res_data: error.toString().replace("Error: ", "").replace("\n", ""),
  //     };
  //     break;
  // }

  // return resBody;
};
