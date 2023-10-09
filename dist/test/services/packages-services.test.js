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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const packages_services_1 = require("../../services/packages.services");
const Package_model_1 = __importDefault(require("../../models/Package.model"));
dotenv_1.default.config();
const mongo_url = process.env.MONGO_URL_TEST;
describe('packages_services', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect('mongodb://localhost/fast-delivery-back');
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield Package_model_1.default.deleteMany({});
    }));
    it('should create a new package', () => __awaiter(void 0, void 0, void 0, function* () {
        const newPackageData = {
            quantity: 0,
            quantity_taked: 0,
            client: 'Cliente de prueba',
            destination: 'Dirección de prueba',
            is_delivered: false,
            package_weight: 1.5,
            additional_information: 'Información adicional de prueba',
        };
        const packageServices = packages_services_1.PackagesServices.getInstance();
        const createdPackage = yield packageServices.createPackage(newPackageData);
        expect(createdPackage).toBeDefined();
        expect(createdPackage.client).toBe(newPackageData.client);
    }));
    it('should get a package by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const newPackageData = {
            quantity_taked: 0,
            quantity: 0,
            client: 'Cliente de prueba5',
            destination: 'Dirección de prueba',
            is_delivered: false,
            package_weight: 1.5,
            additional_information: 'Información adicional de prueba',
        };
        const packageServices = packages_services_1.PackagesServices.getInstance();
        const createdPackage = yield packageServices.createPackage(newPackageData);
        const retrievedPackage = yield packageServices.getPackage(createdPackage.id);
        expect(retrievedPackage).toBeDefined();
        expect(retrievedPackage === null || retrievedPackage === void 0 ? void 0 : retrievedPackage.id).toEqual(createdPackage.id);
    }));
    it('should delete a package by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const newPackageData = {
            quantity: 0,
            quantity_taked: 0,
            client: 'Cliente de prueba5',
            destination: 'Dirección de prueba',
            is_delivered: false,
            package_weight: 1.5,
            additional_information: 'Información adicional de prueba',
        };
        const packageServices = packages_services_1.PackagesServices.getInstance();
        const createdPackage = yield packageServices.createPackage(newPackageData);
        yield packageServices.deletePackage(createdPackage.id);
        const deletedPackage = yield packageServices.getPackage(createdPackage.id);
        expect(deletedPackage).toBeNull();
    }));
    it('should edit a package', () => __awaiter(void 0, void 0, void 0, function* () {
        const newPackageData = {
            quantity_taked: 0,
            quantity: 0,
            client: 'Cliente de prueba', destination: 'Dirección de prueba',
            is_delivered: false,
            package_weight: 1.5,
            additional_information: 'Información adicional de prueba',
        };
        const packageServices = packages_services_1.PackagesServices.getInstance();
        const createdPackage = yield packageServices.createPackage(newPackageData);
        const updatedData = Object.assign(Object.assign({}, createdPackage.toObject()), { is_delivered: true });
        const updatedPackage = yield packageServices.editPackage(createdPackage.id, updatedData);
        expect(updatedPackage).toBeDefined();
    }));
    it('should get all packages', () => __awaiter(void 0, void 0, void 0, function* () {
        const packageServices = packages_services_1.PackagesServices.getInstance();
        const allPackages = yield packageServices.getPackages();
        expect(allPackages).toBeDefined();
        expect(Array.isArray(allPackages)).toBe(true);
    }));
});
