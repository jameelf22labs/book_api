export interface IReview {
  id?: number;
  bookId?: string;
  userId?: string;
  rating?: number;
  comment?: string;
  createdAt?: Date;
}
