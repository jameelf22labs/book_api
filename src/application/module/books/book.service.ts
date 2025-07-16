import { IBook } from "../../entity/IBook";
import { IUser } from "../../entity/IUser";
import BadRequestError from "../../errors/BadRequestError";
import { Books } from "../../models";
import { CreateBookDto, QueryBookDto } from "./interface/dtos/book.dtos";
import IBookService from "./interface/service/book.service.interface";

export default class BookService implements IBookService {
  async createBook(bookDto: CreateBookDto, user?: IUser): Promise<IBook> {
    const books = await Books.create({ ...bookDto, createdBy: user?.id });
    return books.save();
  }

  async getBooks(
    queryDto: QueryBookDto
  ): Promise<{ rows: Books[]; count: number }> {
    const { genre, author, title, page, limit } = queryDto;

    const books = await Books.findAndCountAll({
      where: {
        genre,
        author,
        title,
      },

      limit: limit,
      offset: (page - 1) * limit,
    });

    return books;
  }
  async getBookById(bookId: number, user?: IUser): Promise<Books | null> {
    return await Books.findOne({ where: { id: bookId } });
  }

  async updateBook(
    updatedBookPayload: IBook,
    bookId: number,
    user?: IUser
  ): Promise<IBook | null> {
    const book = await Books.findOne({ where: { id: bookId } });
    if (book === null) {
      throw new BadRequestError(" Book not found ");
    }

    if (
      user?.id &&
      typeof user?.id === "string" &&
      book.createdBy === user?.id
    ) {
      const updatedBook = await book.update(
        { ...updatedBookPayload },
        { where: { id: bookId } }
      );

      return updatedBook;
    }

    throw new BadRequestError("Only created user can edit");
  }

  async deleteBook(bookId: number, user?: IUser) {
    const book = await Books.findOne({ where: { id: bookId } });

    if (book === null) {
      throw new BadRequestError(" Book not found ");
    }

    if (
      user?.id &&
      typeof user?.id === "string" &&
      book.createdBy === user?.id
    ) {
      await Books.destroy({
        where: {
          id: bookId,
        },
      });
    }

    throw new BadRequestError("Only created user can edit");
  }
}
