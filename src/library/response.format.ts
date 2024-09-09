import { HTTPMethod } from "elysia";

export async function responseFormat(message: any) {
  let format = {
    res_code: "0000",
    res_message: "REQUEST_SUCCESSFULLY",
    res_data: message || {},
  };

  return format;
}
