import { IReview } from "../../entity/IReview";
import { IUser } from "../../entity/IUser";
import BadRequestError from "../../errors/BadRequestError";
import { BookQueryHelper, ReviewQueryHelper } from "../../helpers";
import { Reviews } from "../../models";
import { CreateReviewPayloadDto } from "./interface/dto/reviews.dtos";
import IReviewService from "./interface/service/reviews.service.interface";

export default class ReviewService implements IReviewService {
  async createReview(
    reviewPayload: CreateReviewPayloadDto,
    bookId: number,
    user?: IUser
  ) {
    if (reviewPayload.rating < 0 || reviewPayload.rating > 5) {
      throw new BadRequestError("Review rating must be 1 to 5");
    }

    await ReviewQueryHelper.hasUserReviewedBook(bookId, user?.id);

    if (user) {
      const review = await Reviews.create({
        ...reviewPayload,
        bookId,
        userId: user.id,
      });
      await review.save();
      await BookQueryHelper.updateAverageRating(bookId);
    }

    throw new BadRequestError("User not found");
  }

  getAllReviews(): Promise<Array<Reviews>> {
    return Reviews.findAll({});
  }
}
