export class AuthorizationError extends Error {
  public message: string;
  public status: number;
  public body: { res_code: string; res_message: string; res_data: any };
  constructor(message: string) {
    super(message);
    this.message = message;
    this.status = 401;
    this.body = {
      res_code: "4002",
      res_message: "AUTHORIZATION_ERROR",
      res_data: message,
    };
  }
}
