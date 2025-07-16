import ValidationError from "../../errors/ValidationError";
import { LoginDto, SignUpDto } from "./interface/dto/request.dto";

export const validateSignUpPayload = (signUpPayload: SignUpDto) => {
  const { name, email, password } = signUpPayload;

  if (name && name.trim() && name.length > 0) {
    return Promise.reject(new ValidationError("Name must be enter"));
  }

  if (email && email.trim() && email.length > 0) {
    return Promise.reject(new ValidationError("Email must be enter"));
  }

  if (password && password.trim() && password.length > 0) {
    return Promise.reject(new ValidationError("Password must be enter"));
  }

  return {
    name: name.trim().toLocaleLowerCase(),
    email: email.trim(),
    password,
  };
};

export const validateLoginPayload = (loginPayload: LoginDto) => {
  const { username, password } = loginPayload;

  if (username && username.trim() && username.length > 0) {
    return Promise.reject(new ValidationError("Username must be enter"));
  }

  if (password && password.trim() && password.length > 0) {
    return Promise.reject(new ValidationError("Password must be enter"));
  }

  return {
    username: username.trim().toLocaleLowerCase(),
    password,
  };
};
