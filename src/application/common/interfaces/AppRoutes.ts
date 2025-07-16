import { Router } from "express";

export default abstract class AppRoutes {
  protected readonly router: Router;

  constructor() {
    this.router = Router();
    this.initRoutes()
  }

  getRouterInstance() {
    return this.router;
  }

  abstract initRoutes(): void;
}
