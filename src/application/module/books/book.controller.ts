import { NextFunction, Request, Response } from "express";
import IBookService from "./interface/service/book.service.interface";
import { CreateBookDto, QueryBookDto } from "./interface/dtos/book.dtos";
import { IUser } from "../../entity/IUser";
import { AuthenticatedRequest } from "../../common/types/AuthenticateRequest";

export default class BookController {
  constructor(private readonly service: IBookService) {}
  async httpCreateBooks(
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) {
    try {
      if (!request.user) {
        return response.status(401).json({ message: "Unauthorized" });
      }

      const user = request.user as IUser;

      const book = await this.service.createBook(
        request.body as CreateBookDto,
        user
      );

      return response.status(201).json({
        message: "Book was Created",
        book,
      });
    } catch (error) {
      next(error);
    }
  }
  async httpGetBooks(
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) {
    try {
      if (!request.user) {
        return response.status(401).json({ message: "Unauthorized" });
      }

      const query = request.query as unknown as QueryBookDto;
      const books = this.service.getBooks(query, request.user);
      return response.status(200).json({
        message: "Books retrieved successfully",
        ...books,
      });
    } catch (error) {
      next(error);
    }
  }
  async httpGetBookById(
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) {
    try {
      if (!request.user) {
        return response.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      next(error);
    }
  }
  async httpUpdateBooks(
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) {
    try {
      if (!request.user) {
        return response.status(401).json({ message: "Unauthorized" });
      }

      const bookId = Number(request.params.id);

      if (isNaN(bookId)) {
        return response.status(400).json({ message: "Invalid Book ID" });
      }

      const book = await this.service.getBookById(bookId, request.user);

      if (!book) {
        return response.status(404).json({ message: "Book not found" });
      }

      return response.status(200).json({ message: "Book retrieved", book });
    } catch (error) {
      next(error);
    }
  }
  async httpDeleteBooks(
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) {
    try {
      if (!request.user) {
        return response.status(401).json({ message: "Unauthorized" });
      }

      const bookId = Number(request.params.id);

      if (isNaN(bookId)) {
        return response.status(400).json({ message: "Invalid Book ID" });
      }

      await this.service.deleteBook(bookId, request.user);

      return response
        .status(200)
        .json({ message: "Book deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
