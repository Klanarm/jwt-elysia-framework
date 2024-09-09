export class DuplicateUserError extends Error {
  public message: string;
  public status: number;
  public body: { res_code: string; res_message: string; res_data: any };
  constructor(message: string) {
    super(message);
    this.message = message;
    this.status = 400;
    this.body = {
      res_code: "4011",
      res_message: "DUPLICATE_USERNAME",
      res_data: message,
    };
  }
}
