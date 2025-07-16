import { IBook } from "./IBook";
import { IReview } from "./IReview";

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  books?: IBook[];
  reviews?: IReview[];
}
