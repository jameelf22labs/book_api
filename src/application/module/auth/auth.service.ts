import ValidationError from "../../errors/ValidationError";
import { Users } from "../../models";
import JwtStrategy from "../../strategy/jwt.strategy";
import { SignUpDto, LoginDto } from "./interface/dto/request.dto";
import { SignupResponse, LoginResponse } from "./interface/dto/response.dto";
import { IAuthService } from "./interface/service/auth.service.interface";
import bcrypt from "bcrypt";

export default class AuthService implements IAuthService {
  async signUp(signUpdto: SignUpDto): Promise<SignupResponse> {
    const user = await Users.findOne({ where: { email: signUpdto.email } });

    if (user) {
      throw new ValidationError("User already Exists");
    }

    const newUser = await Users.create({
      ...signUpdto,
      password: bcrypt.hashSync(signUpdto.password, 10),
    });

    await newUser.save();

    return {
      username: signUpdto.email,
    };
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await Users.findOne({ where: { email: loginDto.username } });

    if (!user) {
      throw new ValidationError("Bad Credentials");
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password
    );

    if (!isValidPassword) {
      throw new ValidationError("Bad Credentials");
    }

    const accessToken = JwtStrategy.generateToken(user);

    return {
      username: loginDto.username,
      accessToken: accessToken,
    };
  }
}
