import user from "./user";
import express from "express";

const router = express();

router.use("/users", user);

export default router;
