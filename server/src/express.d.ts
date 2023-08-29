import { InferAttributes } from "sequelize";
import { User } from "./db/models/user";

declare global {
  declare namespace Express {
    export interface Request {
      user?: InferAttributes<User>;
    }
  }
}
