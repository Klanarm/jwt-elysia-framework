import { t } from "elysia";
import { AuthenticationError } from "../exceptions/AuthenticationError";

export const apikeysHandler = {
  apikeyAuthentication: async ({ headers }) => {
    if (!headers["x-api-key"] || headers["x-api-key"] !== process.env.API_KEY) {
      throw new AuthenticationError("Unauthorized: Invalid API Key");
    }
  },

  validateApikey: t.Object({
    "x-api-key": t.String(),
  }),
};
