import { NODE_ENV, SESSION_SECRET } from "../env";
import { NextFunction, Request, Response } from "express";

import UserModel from "./db/models/user";
import jwt from "jsonwebtoken";

type AuthToken = { id: number };

function notFound(req: Request, res: Response) {
  res.status(404);
  res.json({
    error: "The route is not defined",
  });
}

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: NODE_ENV === "production" ? "" : err.stack,
  });
}

function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["x-access-token"];
  if (token && typeof token === "string") {
    jwt.verify(token, SESSION_SECRET, (err, decoded) => {
      if (err) {
        return next();
      }
      const decodedToken = decoded as AuthToken;
      if (typeof decoded !== "object") {
        return next();
      }
      UserModel.findOne({
        where: { id: decodedToken?.id },
      })
        .then((user) => {
          if (!user) {
            throw new Error("No user found with provided token");
          }
          req.user = user.toJSON();
          return next();
        })
        .catch(() => {
          next();
        });
    });
  } else {
    return next();
  }
}

export { notFound, errorHandler, auth };
