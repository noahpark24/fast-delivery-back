import express from "express";
import { login, logout, signup } from "../controllers/user.controller";
import validateUser from "../middlewares/auth";

const router = express();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
