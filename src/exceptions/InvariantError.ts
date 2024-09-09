export class InvariantError extends Error {
  public message: string;
  public status: number;
  public body: { res_code: string; res_message: string; res_data: any };
  constructor(message: string) {
    super(message);
    this.message = message;
    this.status = 403;
    this.body = {
      res_code: "4003",
      res_message: "INVARIANT_ERROR",
      res_data: message,
    };
  }
}
