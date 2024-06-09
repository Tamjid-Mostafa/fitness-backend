import { Request } from "express"
import { JwtPayload } from "jsonwebtoken";
export interface IGetUserAuthInfoRequest extends Request {
  userId?: JwtPayload | string;
}