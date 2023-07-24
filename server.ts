import express, { Request, Response } from "express";
import validateUser from "./middlewares/auth";
import bodyParser from "body-parser";
import routes from "./routes/index";
import connectDB from "./config/db";

const server = express();

//middlewares
server.use(bodyParser.json());
server.use("/api", routes);

server.get("/", (req: Request, res: Response) => {
  res.send("HOLA MUNDOOOOOOO");
});

console.log("CHAU MUNDOOOOOO");

connectDB();
server.listen(3001, () => {
  console.log("listening");
});
