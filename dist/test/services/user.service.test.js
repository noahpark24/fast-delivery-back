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
const user_services_1 = __importDefault(require("../../services/user.services"));
const globals_1 = require("@jest/globals");
const User_model_1 = __importDefault(require("../../models/User.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongo_url = process.env.MONGO_URL_TEST;
const newUserData = {
    email: '1234@test.com',
    password: 'Hola1234',
    name: 'Jose',
    last_name: 'Moya',
};
(0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () { return yield mongoose_1.default.connect('mongodb://localhost/fast-delivery-back'); }));
(0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () { return yield mongoose_1.default.disconnect(); }));
(0, globals_1.describe)('User_Services', () => {
    const userServices = user_services_1.default.getInstance();
    (0, globals_1.it)('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield userServices.createUser(newUserData);
            const createdUser = yield User_model_1.default.findOne({ email: newUserData.email });
            (0, globals_1.expect)(createdUser).toBeDefined();
            if (createdUser) {
                (0, globals_1.expect)(createdUser.email).toBe(newUserData.email);
                (0, globals_1.expect)(createdUser.name).toEqual(newUserData.name);
                (0, globals_1.expect)(createdUser.last_name).toBe(newUserData.last_name);
            }
        }
        catch (error) {
            console.error(error);
        }
    }));
    (0, globals_1.it)('should find user by email', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield userServices.findByUserEmail(newUserData.email);
            const findedUser = yield User_model_1.default.findOne({ email: newUserData.email });
            (0, globals_1.expect)(findedUser).toBeDefined();
            if (findedUser) {
                (0, globals_1.expect)(findedUser.email).toMatch(newUserData.email);
                (0, globals_1.expect)(findedUser.name).toEqual(newUserData.name);
                (0, globals_1.expect)(findedUser.last_name).toBe(newUserData.last_name);
            }
        }
        catch (error) {
            console.error(error);
        }
    }));
    (0, globals_1.it)('should validate password', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield userServices.validateUserPassword(newUserData.email, newUserData.password);
            const findedUser = yield User_model_1.default.findOne({ email: newUserData.email });
            (0, globals_1.expect)(findedUser).toBeDefined();
            if (findedUser) {
                (0, globals_1.expect)(findedUser.email).toMatch(newUserData.password);
            }
        }
        catch (error) {
            console.error(error);
        }
    }));
});
