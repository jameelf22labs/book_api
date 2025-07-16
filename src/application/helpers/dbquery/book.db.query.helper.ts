import BadRequestError from "../../errors/BadRequestError";
import { Books } from "../../models";

export default class BookQueryHelper {
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

  static canBookCreatedByUser(bookId: number, userId: number = -100) {
    return Books.findOne({ where: { id: bookId } }).then((book) => {
      if (book?.createdBy === userId) {
        return Promise.resolve(book);
      }
      return Promise.reject(new BadRequestError("Only Created User Can Crud"));
    });
  }
}
