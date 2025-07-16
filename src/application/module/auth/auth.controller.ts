import { NextFunction, Request, Response } from "express";
import { IAuthService } from "./interface/service/auth.service.interface";
import { SignUpDto, LoginDto } from "./interface/dto/request.dto";
import { validateSignUpPayload, validateLoginPayload } from "./auth.validator";
import ValidationError from "../../errors/ValidationError";

export default class AuthController {
  constructor(private readonly service: IAuthService) {}

  async httpSignUp(request: Request, response: Response) {
    try {
      const signupPayload: SignUpDto = request.body;
      const validatedPayload = await validateSignUpPayload(signupPayload);
      const signupResponse = await this.service.signUp(validatedPayload);
      return response.status(201).json({
        ...signupResponse,
        message: "Successfully created an account",
      });
    } catch (error) {
      console.error(error);

      if (error instanceof ValidationError) {
        return response.status(error.statusCode).json({
          message: error.message,
        });
      }

      return response.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  async httpLogin(request: Request, response: Response) {
    try {
      const loginPayload: LoginDto = request.body;
      const validatedPayload = await validateLoginPayload(loginPayload);
      const loginResponse = await this.service.login(validatedPayload);
      return response.status(200).json({
        ...loginResponse,
        message: "Successfully logged in",
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error(error.stack);
        return response.status(error.statusCode).json({
          message: error.message,
        });
      }

      return response.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
}
