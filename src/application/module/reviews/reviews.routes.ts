import JwtMiddleware from "../../../middleware/jwt.middleware";
import AppRoutes from "../../common/interfaces/AppRoutes";
import ReviewController from "./reviews.controller";
import ReviewService from "./reviews.service";

export default class ReviewRoutes extends AppRoutes {
  constructor() {
    super();
    this.initRoutes();
  }

  initRoutes(): void {
    const controller = new ReviewController(new ReviewService());

    this.router.post(
      "/:bookId/reviews",
      JwtMiddleware.verifyToken,
      controller.createReview.bind(controller)
    );
    this.router.get(
      "/:bookId/reviews",
      JwtMiddleware.verifyToken,
      controller.getAllReviews.bind(controller)
    );
  }
}
