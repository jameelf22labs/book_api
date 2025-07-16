import express, { NextFunction, Request, Response } from "express";
import sequelize from "./application/dbconfiq/sequlize.confiq";
import AuthRoutes from "./application/module/auth/auth.routes";
import BookRoutes from "./application/module/books/book.routes";

const application = async () => {
  try {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    await sequelize.authenticate();
    console.log("Sequelize with Postgres Connected");

    const authRoutes = new AuthRoutes();
    const bookRoutes = new BookRoutes();

    app.use("/auth", authRoutes.getRouterInstance());
    app.use("/book", bookRoutes.getRouterInstance());

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      console.error(err.stack);
      res.status(500).json({ message: "Internal Server Error" });
    });

    return app;
  } catch (error) {
    throw error;
  }
};

export default application;
