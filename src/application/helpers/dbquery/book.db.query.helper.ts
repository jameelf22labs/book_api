import BadRequestError from "../../errors/BadRequestError";
import { Books } from "../../models";

export default class BookQueryHelper {
  
  static updateAverageRating(rating: number, bookId: number) {
      throw new Error("Method not implemented.");
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
