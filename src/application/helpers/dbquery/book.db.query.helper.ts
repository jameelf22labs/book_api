import BadRequestError from "../../errors/BadRequestError";
import { Books } from "../../models";
import ReviewQueryHelper from "./review.db.query.helper";

export default class BookQueryHelper {
  static async updateAverageRating(bookId: number) {
    const reviews = await ReviewQueryHelper.findReviewsByBookId(bookId);

    if (reviews.length === 0) {
      await Books.update({ averageRating: 0 }, { where: { id: bookId } });
      return;
    }

    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    const average = total / reviews.length;

    await Books.update(
      { averageRating: parseFloat(average.toFixed(2)) },
      { where: { id: bookId } }
    );
  }

  static findAllWithPaginated(
    whereContition: Record<string, any>,
    limit: number,
    page: number
  ) {
    return Books.findAndCountAll({
      where: whereContition,
      limit: limit,
      offset: (page - 1) * limit,
    });
  }

  static async canBookCreatedByUser(bookId: number, userId: number = -100) {
    const book = await Books.findOne({ where: { id: bookId } });

    if (!book) {
      throw new BadRequestError("Book not found.");
    }

    if (book.createdBy !== userId) {
      throw new BadRequestError(
        "Only the user who created the book can perform this action."
      );
    }

    return book;
  }
}
