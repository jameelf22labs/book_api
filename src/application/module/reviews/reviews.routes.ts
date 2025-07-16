import AppRoutes from "../../common/interfaces/AppRoutes";

export default class ReviewRoutes extends AppRoutes {
  initRoutes(): void {
    this.router.post("/:bookId/reviews");
    this.router.get("/:bookId/reviews");
  }
}
