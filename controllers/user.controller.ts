import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Responses } from "../services/responses";
import { generateToken } from "../config/tokens";
import {
  createUser,
  findByUsername,
  validateUserPassword,
} from "../services/user";
import {
  UserInterface,
  UserPayload,
  UserWithPasswordValidation,
} from "../interfaces/user.interfaces";
const responses = new Responses();

const signup = asyncHandler(async (req: Request, res: Response) => {
  try {
    let user: UserInterface = req.body;
    const foundUser = await findByUsername(user.username);
    if (foundUser) {
      responses.error(res, "invalid data", 400);
    } else {
      await createUser(user);
      responses.success(res, "user created succesfuly", 201);
    }
  } catch (error) {
    console.log("por esto moriii : ", error);
  }
});

const login = asyncHandler(async (req: Request, res: Response) => {
  try {
    let user: UserWithPasswordValidation = req.body;

    const searchUser = await findByUsername(user.username);

    if (!searchUser) {
      responses.error(res, "invalid data", 404);
    }
    const isValid = await validateUserPassword(user, user.password);
    if (!isValid) {
      responses.error(res, "invalid data", 404);
    }

    const payload: UserPayload = {
      id: user.id,
      username: user.username,
      is_admin: user.is_admin,
      is_deleted: user.is_deleted,
    };

    const token = generateToken(payload);

    responses.success(res, token, 200);
  } catch (error) {
    responses.error(res, "login error", 400);
  }
});

export { login, signup };
