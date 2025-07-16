import jwt, { JwtPayload } from "jsonwebtoken";
import envConfig from "../../config/dotenv.confiq";
import { NextFunction, Request, Response } from "express";

export interface CustomRequest extends Request {
  user: JwtPayload | string;
}

export default class JwtMiddleware {
  static verifyToken(
    request: Request,
    response: Response,
    next: NextFunction
  ): void {
    const accessToken = request.header("Authorization")?.replace("Barear", "");
    if (!accessToken) {
      response.status(401).json({ message: "Access Denied" });
    }

    const payload = jwt.verify(accessToken as string, envConfig.JwtSectret);
    (request as CustomRequest).user = payload;
    next();
  }
}
