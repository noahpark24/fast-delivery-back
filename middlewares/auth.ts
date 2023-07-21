import { Request, Response, NextFunction } from "express";
import { validateToken } from "../config/tokens";
 
interface AuthenticatedUser {
  //  propiedades que tiene tu usuario autenticado
  id: number;
  name: string;
  email: string;
  lastName: string;
  admin: boolean;
  // ...
} 

// Extiende la interfaz Request para agregar la propiedad 'user'
declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

function validateAuth(req: Request, res: Response, next: NextFunction): void {
  const token: string | undefined = req.cookies.token;

  if (!token) {
    res.sendStatus(401);
    return;
  }

  const { user }: { user: AuthenticatedUser } = validateToken(token);
  if (!user) {
    res.sendStatus(401);
    return;
  }

  req.user = user;

  next();
}

export { validateAuth };
