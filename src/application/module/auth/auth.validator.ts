import ValidationError from "../../errors/ValidationError";
import { LoginDto, SignUpDto } from "./interface/dto/request.dto";

export const validateSignUpPayload = (signUpPayload: SignUpDto) => {
  const { name, email, password } = signUpPayload;

  if (!name || !name.trim() || name.length === 0) {
    throw new ValidationError("Name must be provided");
  }

  if (!email || !email.trim() || email.length === 0) {
    throw new ValidationError("Email must be provided");
  }

  if (!password || !password.trim() || password.length === 0) {
    throw new ValidationError("Password must be provided");
  }

  return {
    name: name.trim().toLowerCase(),
    email: email.trim(),
    password,
  };
};

export const validateLoginPayload = (loginPayload: LoginDto) => {
  const { username, password } = loginPayload;

  if (!username || !username.trim() || username.length === 0) {
    throw new ValidationError("Username must be provided");
  }

  if (!password || !password.trim() || password.length === 0) {
    throw new ValidationError("Password must be provided");
  }

  return {
    username: username.trim().toLowerCase(),
    password,
  };
};