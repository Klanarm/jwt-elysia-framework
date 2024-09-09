export class AuthenticationError extends Error {
  public message: string;
  public status: number;
  public body: { res_code: string; res_message: string; res_data: any };

  constructor(message: string) {
    super(message);
    this.message = message;
    this.status = 401;
    this.body = {
      res_code: "4001",
      res_message: "AUTHENTICATION_ERROR",
      res_data: message,
    };
  }
}