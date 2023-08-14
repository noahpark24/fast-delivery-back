import express from "express";
import { hola, login, logout, signup } from "../controllers/user.controller";
import validateUser from "../middlewares/auth";

const router = express();

router.post("/signup", signup);
router.post("/login", login);
router.post("/hola", validateUser, hola);
router.post("/logout", validateUser, logout);

export default router;
