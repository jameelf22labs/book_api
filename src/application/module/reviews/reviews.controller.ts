import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../../common/types/AuthenticateRequest";
import IReviewService from "./interface/service/reviews.service.interface";

export default class ReviewController {
  constructor(private readonly service: IReviewService) {}

  async createReview(
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) {
    try {
      if (!request.user) {
        return response.status(401).json({ message: "Unauthorized" });
      }

      await this.service.createReview(
        request.body,
        request.params.bookId,
        request.user
      );

      return response.status(200).json({
        message: "Review Created",
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllReviews(
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) {
    try {
      if (!request.user) {
        return response.status(401).json({ message: "Unauthorized" });
      }

      const allReviews = await this.service.getAllReviews();

      return response.status(200).json({
        reviews: allReviews,
      });
    } catch (error) {
      next(error);
    }
  }
}
