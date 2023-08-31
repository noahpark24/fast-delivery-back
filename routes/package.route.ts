import express from "express";
import {
  getAllPackages,
  getOnePackage,
  deletePackageById,
  editPackageById,
  createPackage,
} from "../controllers/package.controller";

const router = express();

router.get("/all", getAllPackages);
router.get("/:id", getOnePackage);
router.post("/create", createPackage);
router.delete("/delete/:id", deletePackageById);
router.put("/edit/:id", editPackageById);

export default router;
