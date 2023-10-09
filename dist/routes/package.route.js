"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const package_controller_1 = require("../controllers/package.controller");
const router = (0, express_1.default)();
router.get('/all', package_controller_1.getAllPackages);
router.get('/:id', package_controller_1.getOnePackage);
router.post('/create', package_controller_1.createPackage);
router.delete('/delete/:id', package_controller_1.deletePackageById);
router.put('/edit/:id', package_controller_1.editPackageById);
exports.default = router;
