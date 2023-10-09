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
exports.editPackageById = exports.deletePackageById = exports.createPackage = exports.getOnePackage = exports.getAllPackages = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const packages_services_1 = require("../services/packages.services");
const responses_1 = require("../services/responses");
const packages_service = packages_services_1.PackagesServices.getInstance();
const responses = new responses_1.Responses();
const getAllPackages = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPackages = yield packages_service.getPackages();
        responses.sendPackage(res, allPackages, 201);
    }
    catch (error) {
        console.error('Error getting package:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.getAllPackages = getAllPackages;
const getOnePackage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const getPackage = yield packages_service.getPackage(id);
        if (!getPackage) {
            res.status(404).send({ error: 'Package not found' });
            return;
        }
        responses.sendPackage(res, getPackage, 201);
    }
    catch (error) {
        console.error('Error getting package:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.getOnePackage = getOnePackage;
const createPackage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        yield packages_service.createPackage(data);
        responses.success(res, 'Package created successfully', 201);
    }
    catch (error) {
        console.error('Error creating package:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.createPackage = createPackage;
const deletePackageById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield packages_service.deletePackage(id);
        responses.success(res, 'Package deleted successfully', 200);
    }
    catch (error) {
        console.error('Error deleting package:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.deletePackageById = deletePackageById;
const editPackageById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    try {
        yield packages_service.editPackage(id, updatedData);
        responses.success(res, 'Package edited successfully', 200);
    }
    catch (error) {
        console.error('Error editing package:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.editPackageById = editPackageById;
