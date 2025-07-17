import BadRequestError from "../../errors/BadRequestError";
import { Reviews } from "../../models";

export default class ReviewQueryHelper {
  static async hasUserReviewedBook(userId: number | string, bookId: number) {
    const parsedUserId = Number(userId);

    if (isNaN(parsedUserId) || !bookId) {
      throw new BadRequestError("Valid User ID and Book ID are required");
    }

    const review = await Reviews.findOne({
      where: { userId: parsedUserId, bookId },
    });

    if (review) {
      throw new BadRequestError("You have already reviewed this book.");
    }

    return review;
  }

  static findReviewsByBookId(bookId: number) {
    return Reviews.findAll({ where: { bookId } });
  }
}
