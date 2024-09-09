import { t } from "elysia";
import { AuthenticationError } from "../exceptions/AuthenticationError";
import { userService } from "../service/userService";

export const authenticationHandler = {
  AuthenticationToken: async ({ jwt, bearer }) => {
    const obj = await jwt.verify(bearer);

    if (!obj) {
      throw new AuthenticationError("Invalid bearer token");
    }

    const user_details = await userService.findUserById(obj.id);
    return { user_details };
  },

  validateAuthentication: t.Object({
    authorization: t.TemplateLiteral("Bearer ${string}"),
  }),
};
