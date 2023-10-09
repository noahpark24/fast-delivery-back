"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hola = exports.logout = exports.signup = exports.login = void 0;
//dependencies
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// config
const tokens_1 = require("../config/tokens");
//services
const responses_1 = require("../services/responses");
const user_services_1 = __importDefault(require("../services/user.services"));
const responses = new responses_1.Responses();
const user_service = user_services_1.default.getInstance();
const signup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const foundUser = yield user_service.findByUserEmail(user.email);
        if (foundUser) {
            responses.error(res, "invalid data", 400);
        }
        else {
            yield user_service.createUser(user);
            responses.success(res, "user created succesfuly", 201);
        }
    }
    catch (error) {
        responses.error(res, "signup error:" + error, 500);
    }
}));
exports.signup = signup;
const login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_service.findByUserEmail(email);
        if (!user) {
            responses.error(res, "Invalid username or password", 404);
            return;
        }
        const isValid = yield user_service.validateUserPassword(user, password);
        if (!isValid) {
            responses.error(res, "Invalid username or password", 401);
            return;
        }
        const payload = {
            id: user.id,
            email: user.email,
            is_admin: user.is_admin,
            is_deleted: user.is_deleted,
            deliveryManInfo: user.deliveryManInfo,
        };
        const token = (0, tokens_1.generateToken)(payload);
        res.cookie("token", token, { sameSite: "none", secure: true });
        responses.success(res, token, 200);
    }
    catch (error) {
        responses.error(res, "Login error", 500);
    }
}));
exports.login = login;
const logout = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            responses.error(res, "User is not logged in", 401);
        }
        res.clearCookie("token");
        responses.success(res, "Logout successful", 200);
    }
    catch (error) {
        responses.error(res, "Logout error", 500);
    }
}));
exports.logout = logout;
const hola = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            responses.error(res, "User is not AUTENTICADO", 401);
        }
        responses.success(res, "HOLA , ESTAS AUTENTICADO", 200);
    }
    catch (error) {
        responses.error(res, "HOLA error", 500);
    }
}));
exports.hola = hola;
