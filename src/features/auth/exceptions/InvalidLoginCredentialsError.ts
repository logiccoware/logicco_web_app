export class InvalidLoginCredentialsError extends Error {
  constructor() {
    super("Invalid login credentials provided.");
    this.name = "InvalidLoginCredentialsError";
  }
}
