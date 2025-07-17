import { IReview } from "./IReview";

export interface IBook {
  id?: number;
  title: string;
  author: string;
  description?: string;
  genre?: string;
  published_year: Date;
  createdBy: string;
  averageRating?: string;
  createdAt?: Date;
  reviews?: IReview[];
}
