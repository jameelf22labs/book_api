import { IBook } from "../../entity/IBook";
import { IUser } from "../../entity/IUser";
import BadRequestError from "../../errors/BadRequestError";
import { BookQueryHelper } from "../../helpers";
import { Books } from "../../models";
import { CreateBookDto, QueryBookDto } from "./interface/dtos/book.dtos";
import IBookService from "./interface/service/book.service.interface";

export default class BookService implements IBookService {
  async createBook(bookDto: CreateBookDto, user?: IUser): Promise<Books> {
    if (!user?.id) {
      throw new BadRequestError("User ID is required");
    }
    const books = await Books.create({
      ...bookDto,
      createdBy: user?.id,
      createdAt: new Date(),
    });
    return books.save();
  }

  async getBooks(
    queryDto: QueryBookDto
  ): Promise<{ rows: Books[]; count: number }> {

    const { genre, author, title, page = 1, limit = 10 } = queryDto;

    const filters: Record<string, any> = {};

    if (genre) filters.genre = genre;
    if (author) filters.author = author;
    if (title) filters.title = title;

    const books = await BookQueryHelper.findAllWithPaginated(
      filters,
      limit,
      page
    );
    
    return books;
  }

  async getBookById(bookId: number, user?: IUser): Promise<Books | null> {
    return await Books.findOne({ where: { id: bookId } });
  }

  async updateBook(
    updatedBookPayload: IBook,
    bookId: number,
    user?: IUser
  ): Promise<Books | null> {
    const book = await Books.findOne({ where: { id: bookId } });

    if (book === null) {
      throw new BadRequestError(" Book not found ");
    }

    await BookQueryHelper.canBookCreatedByUser(book.id, user?.id);

    const updatedBook = await book.update(
      { ...updatedBookPayload },
      { where: { id: bookId } }
    );

    return updatedBook;
  }

  async deleteBook(bookId: number, user?: IUser) {
    const book = await Books.findOne({ where: { id: bookId } });

    if (book === null) {
      throw new BadRequestError(" Book not found ");
    }

    await BookQueryHelper.canBookCreatedByUser(book.id, user?.id);

    await Books.destroy({
      where: {
        id: bookId,
      },
    });
  }
}
