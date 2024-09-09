export class NotFoundError extends Error {
  public message: string;
  public status: number;
  public body: { res_code: string; res_message: string; res_data: any };
  constructor(message: string) {
    super(message);
    this.message = message;
    this.status = 404;
    this.body = {
      res_code: "4004",
      res_message: "NOT_FOUND",
      res_data: message,
    };
  }
}
