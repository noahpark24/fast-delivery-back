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
exports.PackagesServices = void 0;
const models_1 = require("../models");
class PackagesServices {
    constructor() { }
    static getInstance() {
        if (!PackagesServices.instance) {
            PackagesServices.instance = new PackagesServices();
        }
        return PackagesServices.instance;
    }
    getPackages() {
        return __awaiter(this, void 0, void 0, function* () {
            const allPackages = yield models_1.Package.find();
            return allPackages;
        });
    }
    getPackage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const onePackage = yield models_1.Package.findById(id);
            return onePackage;
        });
    }
    createPackage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPackage = new models_1.Package(data);
            yield newPackage.save();
            return newPackage;
        });
    }
    deletePackage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedPackage = yield models_1.Package.findByIdAndRemove(id, {
                select: '_id',
            });
            if (!deletedPackage) {
                console.log('Package not found');
            }
        });
    }
    editPackage(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedPackage = yield models_1.Package.findByIdAndUpdate(id, updatedData);
            return updatedPackage;
        });
    }
    addSeederPackages(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingProducts = yield models_1.Package.find();
            if (existingProducts.length === 0) {
                for (const product of productData) {
                    yield models_1.Package.create(product);
                }
                console.log('Seeding complete!');
            }
            else {
                console.log('Products already exist in the database.');
            }
        });
    }
}
exports.PackagesServices = PackagesServices;
PackagesServices.instance = null;
