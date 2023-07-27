import user from "./user.routes";
import express from "express";

const router = express();

router.use("/users", user);

export default router;
