import jwt, { SignOptions } from "jsonwebtoken";
import envConfig from "../../config/dotenv.confiq";

export default class JwtStrategy {
  static generateToken(
    payload: object | string,
    expires: string = "1d"
  ): string {
    return jwt.sign(
      payload as object,
      envConfig.JwtSectret as string,
      {
        expiresIn: expires,
      } as SignOptions
    );
  }
}
