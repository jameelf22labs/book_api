import { Router, Request } from "express";
import AuthService from "./auth.service";
import AuthController from "./auth.controller";
import AppRoutes from "../../common/interfaces/AppRoutes";

export default class AuthRoutes extends AppRoutes {
  initRoutes() {
    const service = new AuthService();
    const controller = new AuthController(service);

    this.router.post(
      "/signup",
      controller.httpSignUp.bind(controller.httpSignUp)
    );
    this.router.post("/login", controller.httpLogin.bind(controller.httpLogin));
  }
}
