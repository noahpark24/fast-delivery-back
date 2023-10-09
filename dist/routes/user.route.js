"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = (0, express_1.default)();
router.post('/signup', user_controller_1.signup);
router.post('/login', user_controller_1.login);
router.get('/hola', auth_1.default, user_controller_1.hola);
router.post('/logout', auth_1.default, user_controller_1.logout);
exports.default = router;
