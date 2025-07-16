import { NextFunction, Request, Response } from "express";
import { IAuthService } from "./interface/service/auth.service.interface";
import { SignUpDto } from "./interface/dto/request.dto";
import { validateSignUpPayload } from "./auth.validator";
import ValidationError from "../../errors/ValidationError";

export default class AuthController {
  constructor(private readonly service: IAuthService) {}
  async httpSignUp(request: Request, response: Response) {
    try {
      const signupPayload: SignUpDto = request.body;
      const signUp = await validateSignUpPayload(signupPayload);
      const signupResponse = this.service.signUp(signUp);
      return response.status(201).json({
        ...signupResponse,
        message: "Successfully created a account",
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
  async httpLogin(request: Request, response: Response) {}
}
