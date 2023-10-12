//dependencies
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
// config
import { generateToken } from "../config/tokens";
//services
import { Responses } from "../services/responses";
import User_Services from "../services/user.services";
// interfaces
import {
  UserInterface,
  UserPayload,
  UserWithPasswordValidation,
} from "../interfaces/user.interfaces";

const responses = new Responses();
const user_service = User_Services.getInstance();

const signup = asyncHandler(async (req: Request, res: Response) => {
  try {
    const user: UserInterface = req.body;
    const foundUser = await user_service.findByUserEmail(user.email);
    if (foundUser) {
      responses.error(res, "invalid data", 400);
    } else {
      await user_service.createUser(user);
      responses.success(res, "user created succesfuly", 201);
    }
  } catch (error) {
    responses.error(res, "signup error:" + error, 500);
  }
});

const login = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password }: UserWithPasswordValidation = req.body;

    const user = await user_service.findByUserEmail(email);

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
      name: user.name,
      profile_img: user.profile_img,
      email: user.email,
      is_admin: user.is_admin,
      is_deleted: user.is_deleted,
      deliveryManInfo: user.deliveryManInfo,
    };

    const token: string = generateToken(payload);

    res.cookie("token", token, { sameSite: "none", secure: true });
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

const hola = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      responses.error(res, "User is not AUTENTICADO", 401);
    }

    responses.success(res, "HOLA , ESTAS AUTENTICADO", 200);
  } catch (error) {
    responses.error(res, "HOLA error", 500);
  }
});

export { login, signup, logout, hola };
