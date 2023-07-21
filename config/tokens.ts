import jwt from"jsonwebtoken";
const  SECRET: string  = 'inflacion'

interface Payload{
  user: any;
}

const generateToken = (payload: Payload): string => {
  const token: string = jwt.sign({ user: payload }, SECRET, { expiresIn: "2d" });
  return token;
};

const validateToken = (token:string): any => {
  return jwt.verify(token, SECRET) as Payload;
};

export { generateToken, validateToken };
