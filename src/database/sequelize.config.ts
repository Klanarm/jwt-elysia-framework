import { Sequelize } from "sequelize-typescript";
import { logDatabaseUtil } from "../library/logStartupInfo";
import { USER } from "./elysia/USER.model";
import { createMasterData } from "../library/masterData";

export const sequelize = new Sequelize(
  (process.env.DATABASE_URL
    ? process.env.DATABASE_URL
    : process.env.SEQUELIZE_URL) as string,
  {
    logging: false,
  }
);

sequelize.addModels([USER]);

export const initDB = async () => {
  try {
    await sequelize
      .authenticate()
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });

    const setSync =
      process.env.NODE_ENV === "localhost" ||
      process.env.NODE_ENV === "developer"
        ? JSON.parse(process.env.SEQUELIZE_SYNC_MODE || '{"force": false}')
        : { force: false };

    await sequelize.sync(setSync);
    if (setSync.force) {
      await createMasterData();
    }
    logDatabaseUtil({
      client: `${
        process.env.DATABASE_URL || process.env.SEQUELIZE_URL
      }`.replace(/:[^@]*@/, "://******@"),
      mode: setSync.force,
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};
