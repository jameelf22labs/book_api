import { IReview } from "../../entity/IReview";
import { IUser } from "../../entity/IUser";
import BadRequestError from "../../errors/BadRequestError";
import { BookQueryHelper, ReviewQueryHelper } from "../../helpers";
import { Books, Reviews } from "../../models";
import { CreateReviewPayloadDto } from "./interface/dto/reviews.dtos";
import IReviewService from "./interface/service/reviews.service.interface";

export default class ReviewService implements IReviewService {
  async createReview(
    reviewPayload: CreateReviewPayloadDto,
    bookId: number,
    user?: IUser
  ) {

    if (!user?.id) {
      throw new BadRequestError("User not found");
    }

    if (reviewPayload.rating < 0 || reviewPayload.rating > 5) {
      throw new BadRequestError("Review rating must be between 0 and 5");
    }

    const book = await Books.findByPk(bookId);

    if (!book) {
      throw new BadRequestError("Book does not exist");
    }

    await ReviewQueryHelper.hasUserReviewedBook(user.id, bookId);

    const review = await Reviews.create({
      ...reviewPayload,
      bookId,
      userId: user.id,
    });

    await BookQueryHelper.updateAverageRating(bookId);
  }

  getAllReviews(): Promise<Array<Reviews>> {
    return Reviews.findAll({});
  }
}
