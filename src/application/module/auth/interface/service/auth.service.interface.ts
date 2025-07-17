import { SignUpDto, LoginDto } from "../dto/request.dto";
import { LoginResponse, SignupResponse } from "../dto/response.dto";

export interface IAuthService {
  signUp(signUpdto: SignUpDto): Promise<SignupResponse>;
  login(loginDto: LoginDto): Promise<LoginResponse>;
}
