import BookService from "./book.service";
import BookController from "./book.controller";
import AppRoutes from "../../common/interfaces/AppRoutes";
import JwtMiddleware from "../../middleware/jwt.middleware";

export default class BookRoutes extends AppRoutes {
  initRoutes() {
    const service = new BookService();
    const controller = new BookController(service);

    this.router.post(
      "",
      JwtMiddleware.verifyToken,
      controller.httpCreateBooks.bind(controller.httpCreateBooks)
    );

    this.router.get(
      "",
      JwtMiddleware.verifyToken,
      controller.httpGetBooks.bind(controller.httpGetBooks)
    );

    this.router.get(
      "/:id",
      JwtMiddleware.verifyToken,
      controller.httpGetBookById.bind(controller.httpGetBookById)
    );

    this.router.patch(
      "/:id",
      JwtMiddleware.verifyToken,
      controller.httpUpdateBooks.bind(controller.httpUpdateBooks)
    );

    this.router.delete(
      "/:id",
      JwtMiddleware.verifyToken,
      controller.httpDeleteBooks.bind(controller.httpDeleteBooks)
    );
  }
}
