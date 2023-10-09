"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = 'inflacion';
const generateToken = (payload) => {
    const token = jsonwebtoken_1.default.sign({ user: payload }, SECRET, {
        expiresIn: '2d',
    });
    return token;
};
exports.generateToken = generateToken;
const validateToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, SECRET);
    }
    catch (error) {
        console.error('Error validating token:', error);
        return null;
    }
};
exports.validateToken = validateToken;
