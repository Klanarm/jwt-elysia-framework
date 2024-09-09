import Elysia, { t } from "elysia";
import { versionHandler } from "../handlers/version.handle";

export const versionRouters = new Elysia({ prefix: "/versions" }).get(
  "/",
  versionHandler.versionDetails,
  { detail: { tags: ["versions"] } }
);
