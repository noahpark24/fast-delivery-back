"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryMan = exports.Package = exports.User = void 0;
const User_model_1 = __importDefault(require("./User.model"));
exports.User = User_model_1.default;
const Package_model_1 = __importDefault(require("./Package.model"));
exports.Package = Package_model_1.default;
const DeliveryMan_model_1 = __importDefault(require("./DeliveryMan.model"));
exports.DeliveryMan = DeliveryMan_model_1.default;
