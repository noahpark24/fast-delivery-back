"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const deliveryMan_controller_1 = require("../controllers/deliveryMan.controller");
const auth_1 = __importDefault(require("../middlewares/auth"));
router.get("/taked-packages", auth_1.default, deliveryMan_controller_1.get_taked_packages);
router.get("/all", auth_1.default, deliveryMan_controller_1.get_all_deliverymans);
router.get("/one", auth_1.default, deliveryMan_controller_1.get_one_deliveryman);
router.post("/take-packages", auth_1.default, deliveryMan_controller_1.take_package);
router.post("/mark-deli", auth_1.default, deliveryMan_controller_1.mark_delivered);
router.delete("/untake-package/:packageId", auth_1.default, deliveryMan_controller_1.untake_package);
exports.default = router;
