import express, { Request, Response } from "express";
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("HOLA MARADONAAAAAAA");
});

console.log("CHAU MUNDOOOOOO");

app.listen(3001, () => {
  console.log("listening...");
});
