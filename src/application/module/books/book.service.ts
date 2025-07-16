import { Books } from "../../models";
import { CreateBookDto, QueryBookDto } from "./interface/dtos/book.dtos";
import IBookService from "./interface/service/book.service.interface";

export default class BookService implements IBookService {
  async createBook(bookDto: CreateBookDto): Promise<Books> {
    const books = await Books.create({ ...bookDto });
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
  getBookById(bookId: number): Promise<Books> {
    throw new Error("Method not implemented.");
  }
  updateBook(bookId: number): Promise<Books> {
    throw new Error("Method not implemented.");
  }
  deleteBook(bookId: number): Promise<Books> {
    throw new Error("Method not implemented.");
  }
}
