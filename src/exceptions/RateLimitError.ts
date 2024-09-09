export class RateLimitError extends Error {
  public message: string;
  public status: number;
  public body: { res_code: string; res_message: string; res_data: any };
  constructor(message: string) {
    super(message);
    this.message = message;
    this.status = 429;
    this.body = {
      res_code: "4029",
      res_message: "TOO_MANY_REQUEST",
      res_data: message,
    };
  }
}
