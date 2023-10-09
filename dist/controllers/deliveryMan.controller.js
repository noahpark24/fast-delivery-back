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
exports.get_one_deliveryman = exports.get_all_deliverymans = exports.untake_package = exports.get_taked_packages = exports.mark_delivered = exports.take_package = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
//Services
const deliveryMan_services_1 = __importDefault(require("../services/deliveryMan.services"));
const responses_1 = require("../services/responses");
const deliveryManServices = deliveryMan_services_1.default.getInstance();
const responses = new responses_1.Responses();
exports.take_package = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const packagesId = req.body;
        const deliveryManId = ((_a = req.user.deliveryManInfo) === null || _a === void 0 ? void 0 : _a.toString()) || "";
        for (let i = 0; i < packagesId.length; i++) {
            yield deliveryManServices.takePackage(packagesId[i], deliveryManId);
        }
        responses.success(res, "package taked succesfully", 200);
    }
    catch (error) {
        responses.error(res, error, 500);
    }
}));
exports.mark_delivered = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { packageId } = req.body;
        const deliveryManId = ((_b = req.user.deliveryManInfo) === null || _b === void 0 ? void 0 : _b.toString()) || "";
        yield deliveryManServices.markDelivered(deliveryManId, packageId);
        responses.success(res, "Package marked as delivered", 200);
    }
    catch (error) {
        responses.error(res, error, 500);
    }
}));
exports.get_taked_packages = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const deliveryManId = ((_c = req.user.deliveryManInfo) === null || _c === void 0 ? void 0 : _c.toString()) || "";
        const takedPackages = yield deliveryManServices.getTakedPackages(deliveryManId);
        responses.sendPackage(res, takedPackages, 200);
    }
    catch (error) {
        responses.error(res, error, 500);
    }
}));
exports.untake_package = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const deliveryManId = ((_d = req.user.deliveryManInfo) === null || _d === void 0 ? void 0 : _d.toString()) || "";
        const { packageId } = req.params;
        yield deliveryManServices.untakePackage(deliveryManId, packageId);
        responses.success(res, "package untaked succesfully", 200);
    }
    catch (error) {
        responses.error(res, error, 500);
    }
}));
exports.get_all_deliverymans = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield deliveryManServices.getAllDeliverymans();
        responses.sendDeliverymans(res, result, 200);
    }
    catch (error) {
        responses.error(res, error, 500);
    }
}));
exports.get_one_deliveryman = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const deliveryManId = ((_e = req.user.deliveryManInfo) === null || _e === void 0 ? void 0 : _e.toString()) || "";
        const result = yield deliveryManServices.findDeliveryManById(deliveryManId);
        responses.sendDeliverymans(res, result, 200);
    }
    catch (error) {
        responses.error(res, error, 500);
    }
}));
