import { NextFunction, Request, Response } from "express";
import { IAuthService } from "./interface/service/auth.service.interface";
import { SignUpDto, LoginDto } from "./interface/dto/request.dto";
import { validateSignUpPayload, validateLoginPayload } from "./auth.validator";

export default class AuthController {
  constructor(private readonly service: IAuthService) {}

  async httpSignUp(request: Request, response: Response, next: NextFunction) {
    try {
      const signupPayload: SignUpDto = request.body;
      const validatedPayload = await validateSignUpPayload(signupPayload);
      const signupResponse = await this.service.signUp(validatedPayload);
      return response.status(201).json({
        ...signupResponse,
        message: "Successfully created an account",
      });
    } catch (error) {
      next(error);
    }
  }

  async httpLogin(request: Request, response: Response, next: NextFunction) {
    try {
      const loginPayload: LoginDto = request.body;
      const validatedPayload = await validateLoginPayload(loginPayload);
      const loginResponse = await this.service.login(validatedPayload);
      return response.status(200).json({
        ...loginResponse,
        message: "Successfully logged in",
      });
    } catch (error) {
      next(error);
    }
  }
}
