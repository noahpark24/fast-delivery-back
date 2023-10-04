import express from "express";
const router = express();
import {
  get_taked_packages,
  mark_delivered,
  take_package,
  untake_package,
} from "../controllers/deliveryMan.controller";
import validateUser from "../middlewares/auth";

router.post("/mark-deli", validateUser, mark_delivered);
router.get("/taked-packages", validateUser, get_taked_packages);
router.post("/take-packages", validateUser, take_package);
router.delete("/untake-package/:packageId", validateUser, untake_package);

export default router;
