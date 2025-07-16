import BadRequestError from "../../errors/BadRequestError";
import { Reviews } from "../../models";

export default class ReviewQueryHelper {
  static async hasUserReviewedBook(userId: number, bookId: number = -100) {
    const review = await Reviews.findOne({ where: { userId, bookId } });

    if (review) {
      throw new BadRequestError(
        "Only the user who created the book can perform this action."
      );
    }

    return review;
  }

  static findReviewsByBookId(bookId: number) {
    return Reviews.findAll({ where: { bookId } });
  }
}
