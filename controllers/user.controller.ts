import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Responses } from "../services/responses";
import { generateToken } from "../config/tokens";
import User_Services from "../services/user.service";
import {
  UserInterface,
  UserPayload,
  UserWithPasswordValidation,
} from "../interfaces/user.interfaces";

const responses = new Responses();
const user_service = new User_Services();

const signup = asyncHandler(async (req: Request, res: Response) => {
  try {
    let user: UserInterface = req.body;
    const foundUser = await user_service.findByUsername(user.username);
    if (foundUser) {
      responses.error(res, "invalid data", 400);
    } else {
      await user_service.createUser(user);
      responses.success(res, "user created succesfuly", 201);
    }
  } catch (error) {
    responses.error(res, "login error ", 500);
  }
});

const login = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { username, password }: UserWithPasswordValidation = req.body;

    const user = await user_service.findByUsername(username);

    if (!user) {
      responses.error(res, "Invalid username or password", 404);
      return;
    }

    const isValid = await user_service.validateUserPassword(user, password);

    if (!isValid) {
      responses.error(res, "Invalid username or password", 401);
      return;
    }

    const payload: UserPayload = {
      id: user.id,
      username: user.username,
      is_admin: user.is_admin,
      is_deleted: user.is_deleted,
    };

    const token: string = generateToken(payload);
    res.cookie("token", token);
    responses.success(res, token, 200);
  } catch (error) {
    responses.error(res, "Login error", 500);
  }
});

const logout = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      responses.error(res, "User is not logged in", 401);
    }

    res.clearCookie("token");

    responses.success(res, "Logout successful", 200);
  } catch (error) {
    responses.error(res, "Logout error", 500);
  }
});

export { login, signup, logout };
