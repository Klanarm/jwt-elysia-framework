import packageInfo from "../../package.json";
import { sequelize } from "../database/sequelize.config";
import { responseFormat } from "../library/response.format";

export const versionHandler = {
  versionDetails: async (ctx) => {
    try {
      let databaseStatus = `OFFLINE`;
      let apiStatus = `ONLINE`;
      await sequelize
        .authenticate()
        .then(() => {
          databaseStatus = `ONLINE`;
        })
        .catch((error) => {
          databaseStatus = `OFFLINE`;
        });

      return responseFormat({
        database_status: databaseStatus,
        api_status: apiStatus,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
