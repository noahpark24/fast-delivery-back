import { Request, Response, NextFunction } from "express";
import { validateToken } from "../config/tokens";
import { Responses } from "../services/responses";
import { UserInterface } from "../interfaces/user.interfaces";
const response = new Responses();

declare global {
  namespace Express {
    interface Request {
      user: UserInterface;
    }
  }
}

function validateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization;
    if (token) {
      const { payload } = validateToken(token);
      req.user = payload as UserInterface;
      if (payload) return next();
    }
    response.error(res, "unauthorized user", 401);
  } catch (error) {
    response.error(res, "validarion error", 401);
  }
}

export default validateUser;
