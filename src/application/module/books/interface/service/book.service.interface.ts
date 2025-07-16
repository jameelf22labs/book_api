import { Books, Users } from "../../../../models";
import { CreateBookDto, QueryBookDto } from "../dtos/book.dtos";

export default interface IBookService {
  createBook(bookDto: CreateBookDto): Promise<Books>;
  getBooks(queryDto: QueryBookDto): Promise<{ rows: Books[]; count: number }>;
  getBookById(bookId: number): Promise<Books>;
  updateBook(bookId: number): Promise<Books>;
  deleteBook(bookId: number): Promise<Books>;
}
