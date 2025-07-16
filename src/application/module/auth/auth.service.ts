import ValidationError from "../../errors/ValidationError";
import { Users } from "../../models";
import JwtStrategy from "../../strategy/jwt.strategy";
import { SignUpDto, LoginDto } from "./interface/dto/request.dto";
import { SignupResponse, LoginResponse } from "./interface/dto/response.dto";
import { IAuthService } from "./interface/service/auth.service.interface";
import bcrypt from "bcrypt";

export default class AuthService implements IAuthService {
  async signUp(signUpDto: SignUpDto): Promise<SignupResponse> {
    const user = await Users.findOne({ where: { email: signUpDto.email } });

    if (user) {
      throw new ValidationError("User already exists");
    }

    const newUser = await Users.create({
      ...signUpDto,
      password: bcrypt.hashSync(signUpDto.password, 10),
    });

    return {
      username: signUpDto.email,
    };
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await Users.findOne({ where: { email: loginDto.username } });

    if (!user) {
      throw new ValidationError("Bad credentials");
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password
    );

    if (!isValidPassword) {
      throw new ValidationError("Bad credentials");
    }

    const accessToken = JwtStrategy.generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    return {
      username: loginDto.username,
      accessToken: accessToken,
    };
  }
}
