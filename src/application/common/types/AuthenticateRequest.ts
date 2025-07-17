import { Request } from "express";
import { IUser } from "../../entity/IUser";

export type AuthenticatedRequest<T = any> = Request<{}, {}, T> & { user?: IUser };
