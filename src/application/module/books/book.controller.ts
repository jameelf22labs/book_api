import { Request, Response } from "express";
import IBookService from "./interface/service/book.service.interface";
import { CreateBookDto, QueryBookDto } from "./interface/dtos/book.dtos";

export default class BookController {
  constructor(private readonly service: IBookService) {}
  async httpCreateBooks(request: Request, response: Response) {
    try {
      const book = await this.service.createBook(request.body as CreateBookDto);
      return response.status(201).json({
        message: "Book was Created",
        book,
      });
    } catch (error) {
      return response.json(500).json({ message: "Internal Server Error" });
    }
  }
  async httpGetBooks(request: Request, response: Response) {
    try {
    } catch (error) {
      return response.json(500).json({ message: "Internal Server Error" });
    }
  }
  async httpGetBookById(request: Request, response: Response) {
    try {
    } catch (error) {
      return response.json(500).json({ message: "Internal Server Error" });
    }
  }
  async httpUpdateBooks(request: Request, response: Response) {
    try {
    } catch (error) {
      return response.json(500).json({ message: "Internal Server Error" });
    }
  }
  async httpDeleteBooks(request: Request, response: Response) {
    try {
    } catch (error) {
      return response.json(500).json({ message: "Internal Server Error" });
    }
  }
}
