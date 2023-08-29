import { NextFunction, Request, Response } from "express";

import { SESSION_SECRET } from "../../env";
import UserModel from "../db/models/user";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

/**
 * Register a new user
 * req.body is expected to contain {username: required(string), password: required(string)}
 */
router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ error: "username and password required" });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ error: "Password must be at least 6 characters" });
      }

      const user = await UserModel.create(req.body);
      const token = jwt.sign({ id: user.id }, SESSION_SECRET!, {
        expiresIn: 86400,
      });
      res.json({
        ...user.toJSON(),
        token,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error?.name === "SequelizeUniqueConstraintError") {
          return res
            .status(401)
            .json({ error: "User with provided username already exists" });
        }
        if (error?.name === "SequelizeValidationError") {
          return res.status(401).json({ error: "Validation error" });
        }
      }
      next(error);
    }
  }
);

/**
 * Authenticate an existing user
 * req.body is expected to contain {username: required(string), password: required(string)}
 */
router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res
          .status(400)
          .json({ error: "username and password required" });
      }

      const user = await UserModel.findOne({
        where: {
          username: req.body.username,
        },
      });

      if (!user) {
        return res
          .status(401)
          .json({ error: "Wrong username and/or password" });
      }
      if (!user.correctPassword(password)) {
        return res
          .status(401)
          .json({ error: "Wrong username and/or password" });
      }
      const token = jwt.sign({ id: user.id }, SESSION_SECRET!, {
        expiresIn: 86400,
      });
      res.json({
        ...user.toJSON(),
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
