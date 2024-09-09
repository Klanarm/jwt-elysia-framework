import { t } from "elysia";
import { InvariantError } from "../exceptions/InvariantError";

export const lineHandler = {
  webhookHandler: async ({ body }) => {
    try {
      body.events.map(async (event: any) => {
        console.log(event.source.userId);

        if (event.replyToken === "0" || event.replyToken === "f") {
          return {};
        }
      });
      return {};
    } catch (error) {
      return new InvariantError("INVARIANT_ERROR");
    }
  },
};
