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
  const token: string = req.cookies.token;

  console.log("EL TOKEN EH ETE : ", token);

  if (!token) return res.sendStatus(401);

  const { payload }: any = validateToken(token);

  console.log("EL PAYLOAD EH ETE : ", payload);

  if (!payload) return res.sendStatus(401);

  req.user = payload;

  next();
}

export default validateUser;
