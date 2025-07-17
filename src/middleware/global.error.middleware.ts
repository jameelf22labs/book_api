import { NextFunction, Request, Response } from "express";
import BadRequestError from "../application/errors/BadRequestError";
import ValidationError from "../application/errors/ValidationError";

const globalExceptionHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err.stack);

  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  res.status(500).json({ message: "Internal Server Error" });
};


export default globalExceptionHandler;