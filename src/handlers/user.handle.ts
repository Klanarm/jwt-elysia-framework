import { t } from "elysia";
import { userService } from "../service/userService";
import { loginError } from "../exceptions/loginError";
import { responseFormat } from "../library/response.format";

export const userHandler = {
  createUser: async ({ body, set, request }) => {
    const passwordHash = await Bun.password.hash(body.password, {
      algorithm: "bcrypt",
      cost: parseInt(process.env.SALT_COST),
    });
    await userService.createUser({
      username: body.username,
      password: passwordHash,
    });
    return responseFormat({});
  },

  loginUser: async ({ jwt, body, set, request }) => {
    const hashedPassword = await userService.getPasswordByUsername(
      body.username
    );
    const isMatch = await Bun.password.verify(
      body.password,
      hashedPassword.password
    );

    if (!isMatch) {
      throw new loginError("Username is not found");
    }

    return responseFormat({
      token: await jwt.sign({ id: hashedPassword.id }),
    });
  },

  userValidate: t.Object({
    username: t.String({ maxLength: 12, minLength: 7 }),
    password: t.String({ maxLength: 12, minLength: 8 }),
  }),
};
