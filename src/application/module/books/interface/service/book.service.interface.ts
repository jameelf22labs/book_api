import { IBook } from "../../../../entity/IBook";
import { IUser } from "../../../../entity/IUser";
import { Books } from "../../../../models";
import { CreateBookDto, QueryBookDto } from "../dtos/book.dtos";

export default interface IBookService {
  createBook(bookDto: CreateBookDto, user?: IUser): Promise<Books>;
  getBooks(
    queryDto: QueryBookDto,
    user?: IUser
  ): Promise<{ rows: Books[]; count: number }>;
  getBookById(bookId: number, user?: IUser): Promise<Books | null>;
  updateBook(
    updatedBookPayload: IBook,
    bookId: number,
    user?: IUser
  ): Promise<Books | null>;
  deleteBook(bookId: number, user?: IUser): void;
}
