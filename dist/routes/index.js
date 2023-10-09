"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_route_1 = __importDefault(require("./user.route"));
const package_route_1 = __importDefault(require("./package.route"));
const deliveryMan_routes_1 = __importDefault(require("./deliveryMan.routes"));
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
router.use('/users', user_route_1.default);
router.use('/packages', package_route_1.default);
router.use('/delivery-man', deliveryMan_routes_1.default);
exports.default = router;
