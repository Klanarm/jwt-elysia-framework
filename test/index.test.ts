import { describe, expect, it } from "bun:test";
import * as dotenv from "dotenv";
import { ElysiaApp } from "../src";
import { treaty } from "@elysiajs/eden";
dotenv.config();
const api = treaty<ElysiaApp>("localhost:3000");

describe("Elysia", () => {
  it("Database", async () => {
    const { data } = await api.versions.index.get();
    expect(data.res_data.database_status).toBe("ONLINE");
  });

  it("userlogin", async () => {
    const { data } = await api.api.v1.login.post(
      {
        username: "superadmin",
        password: "12345678",
      },
      { headers: { "x-api-key": process.env.API_KEY } }
    );
    expect(data.res_code).toBe("0000");
  });
});
