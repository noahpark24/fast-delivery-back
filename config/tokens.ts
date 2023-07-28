import jwt from "jsonwebtoken";
import { UserPayload } from "../interfaces/user.interfaces";

const SECRET: string = "inflacion";

const generateToken = (payload: UserPayload): string => {
  const token: string = jwt.sign({ user: payload }, SECRET, {
    expiresIn: "2d",
  });
  return token;
};

const validateToken = (token: string): UserPayload | null => {
  try {
    const decodedToken = jwt.verify(token, SECRET) as UserPayload;
    return decodedToken;
  } catch (error) {
    console.error("Error validating token:", error);
    return null;
  }
};

export { generateToken, validateToken };
