import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import envConfig from "../config/dotenv.confiq";
import { AuthenticatedRequest } from "../application/common/types/AuthenticateRequest";
import { IUser } from "../application/entity/IUser";

export default class JwtMiddleware {
  static verifyToken(
    request: Request,
    response: Response,
    next: NextFunction
  ): void | Response {
    const authHeader = request.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return response
        .status(401)
        .json({ message: "Access Denied: No valid token provided" });
    }

    const accessToken = authHeader.replace("Bearer ", "").trim();

    try {
      const payload = jwt.verify(
        accessToken,
        envConfig.JwtSectret
      ) as JwtPayload;

      if (!payload.id || !payload.email || !payload.name) {
        return response.status(401).json({ message: "Invalid token payload" });
      }

      (request as AuthenticatedRequest).user = payload as IUser;
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return response.status(401).json({ message: "Invalid token" });
      }
      if (error instanceof jwt.TokenExpiredError) {
        return response.status(401).json({ message: "Token expired" });
      }
      console.error("JWT Verification Error:", error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }
}
