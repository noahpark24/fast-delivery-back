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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const models_2 = require("../models");
class User_Services {
    static getInstance() {
        if (!User_Services.instance) {
            User_Services.instance = new User_Services();
        }
        return User_Services.instance;
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdUser = yield models_1.User.create(userData);
                if (!createdUser.is_admin) {
                    const newDeliveryMan = new models_2.DeliveryMan();
                    yield newDeliveryMan.save();
                    createdUser.deliveryManInfo = newDeliveryMan._id;
                }
                yield createdUser.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByUserEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.User.findOne({
                    email,
                });
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    validateUserPassword(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isValid = yield user.validatePassword(password);
                return isValid;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
User_Services.instance = null;
exports.default = User_Services;
