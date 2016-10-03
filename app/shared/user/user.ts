var validator = require("email-validator");

export class User {
  email: string;
  password: string;
  phone: string;
  name: string;
  isValidEmail() {
    return validator.validate(this.email);
  }
}