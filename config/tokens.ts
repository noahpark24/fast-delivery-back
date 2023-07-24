import jwt from "jsonwebtoken";
import { UserPayload } from "../interfaces/user.interfaces";

const SECRET: string = "inflacion";

const generateToken = (payload: UserPayload): string => {
  const token: string = jwt.sign({ user: payload }, SECRET, {
    expiresIn: "2d",
  });
  return token;
};

const validateToken = (token: string): any => {
  return jwt.verify(token, SECRET) as UserPayload;
};

export { generateToken, validateToken };
