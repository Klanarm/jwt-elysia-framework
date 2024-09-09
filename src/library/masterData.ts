import { USER } from "../database/elysia/USER.model";
import user_seeder from "../seed/user.json";

export const createMasterData = async () => {
  try {
    await USER.bulkCreate(user_seeder);
  } catch (error) {
    console.log(error);
  }
};
