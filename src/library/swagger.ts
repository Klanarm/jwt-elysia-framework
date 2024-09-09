import type { ElysiaSwaggerConfig } from "@elysiajs/swagger/dist/types";

export const swaggerConfig: ElysiaSwaggerConfig = {
  provider: "scalar",
  exclude: "/versions/",
  documentation: {
    components: {
      securitySchemes: {
        "x-api-key": {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
          description: "Key used to log into the soundcloud API.",
        },
        Authorization: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
    info: {
      title: process.env.PROJECT_NAME,
      version: "1.0.0",
    },
  },

  scalarConfig: {
    metaData: {
      title: "API Document",
    },
  },
};

export const swaggerExampleResponse = (example: any) => {
  return {
    "200": {
      description: "report list",
      content: {
        "application/json": {
          examples: {
            "report list": {
              value: {
                res_code: "0000",
                res_message: "REQUEST_SUCCESSFULLY",
                res_data: example,
              },
            },
          },
        },
      },
    },
    "400": {
      description: "Invalid query",
      content: {
        "application/json": {
          examples: {
            "error details": {
              value: {
                res_code: "4000",
                res_message: "VALIDATION_ERROR",
                res_data: [
                  {
                    path: "parameter",
                    on: "error on",
                    message: "error details",
                  },
                ],
              },
            },
          },
        },
      },
    },
    "401": {
      description: "Invalid api key",
      content: {
        "application/json": {
          examples: {
            "error details": {
              value: {
                res_code: "4001",
                res_message: "AUTHENTICATION_ERROR",
                res_data: "any details",
              },
            },
          },
        },
      },
    },
  };
};
