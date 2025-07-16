import { IReview } from "../../../../entity/IReview";
import { IUser } from "../../../../entity/IUser";
import { Reviews } from "../../../../models";
import { CreateReviewPayloadDto } from "../dto/reviews.dtos";

export default interface IReviewService {
  createReview(
    reviewPayload: CreateReviewPayloadDto,
    bookId: number,
    user?: IUser
  ): void;
  getAllReviews(): Promise<Array<Reviews>>;
}
