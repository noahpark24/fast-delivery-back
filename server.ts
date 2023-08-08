import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/index";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import cors from "cors";

const server = express();

//middlewares
server.use(bodyParser.json());
server.use(express.json());
server.use(cookieParser());
server.use("/api", routes);
server.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

connectDB();
server.listen(3001, "0.0.0.0", () => {
  console.log("listening");
});
