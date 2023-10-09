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
const mongoose_1 = require("mongoose");
const DeliveryMan_model_1 = __importDefault(require("../models/DeliveryMan.model"));
const Package_model_1 = __importDefault(require("../models/Package.model"));
const packages_services_1 = require("./packages.services");
const packages_service = packages_services_1.PackagesServices.getInstance();
const User_model_1 = __importDefault(require("../models/User.model"));
class DeliveryManService {
    constructor() { }
    static getInstance() {
        if (!DeliveryManService.instance) {
            DeliveryManService.instance = new DeliveryManService();
        }
        return DeliveryManService.instance;
    }
    findDeliveryManById(deliverymanId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deliveryman = yield DeliveryMan_model_1.default.findById(deliverymanId);
                if (!deliveryman) {
                    throw new Error("Deliveryman not found");
                }
                return deliveryman;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAllDeliverymans() {
        return __awaiter(this, void 0, void 0, function* () {
            const registeredDeliverymans = yield DeliveryMan_model_1.default.find();
            const nonAdminUsers = yield User_model_1.default.find({ is_admin: false });
            const combinedResults = {
                deliverymans: registeredDeliverymans,
                users: nonAdminUsers,
            };
            return combinedResults;
        });
    }
    takePackage(packageId, deliverymanId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deliveryman = yield this.findDeliveryManById(deliverymanId);
                const pack = yield packages_service.getPackage(packageId);
                const takedPackage = new mongoose_1.Types.ObjectId(packageId);
                if (pack) {
                    pack.quantity_taked = pack.quantity;
                    pack.quantity = 0;
                    yield pack.save();
                    if (deliveryman.current_deliveries < 10) {
                        deliveryman.current_deliveries += pack.quantity_taked;
                        deliveryman.packages.push(takedPackage);
                    }
                }
                else {
                    return "daily packages limit exceded";
                }
                yield deliveryman.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
    untakePackage(deliverymanId, packageId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deliveryman = yield this.findDeliveryManById(deliverymanId);
                const pack = yield packages_service.getPackage(packageId);
                const packageToDeleteId = new mongoose_1.Types.ObjectId(packageId);
                const packageIndex = deliveryman.packages.indexOf(packageToDeleteId);
                if (packageIndex !== -1) {
                    if (pack) {
                        deliveryman.packages.splice(packageIndex, 1);
                        pack.quantity = pack.quantity_taked;
                        pack.quantity_taked = 0;
                        yield pack.save();
                        if (deliveryman.current_deliveries > 0) {
                            deliveryman.current_deliveries -= pack.quantity;
                        }
                    }
                    else {
                        return "daily packages limit exceded";
                    }
                    yield deliveryman.save();
                }
                else {
                    throw new Error("Package not found in deliveryman packages");
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    getTakedPackages(deliverymanId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deliveryman = yield this.findDeliveryManById(deliverymanId);
                const packageIds = deliveryman.packages;
                const packagesData = yield Package_model_1.default.find({ _id: { $in: packageIds } });
                if (packagesData.length > 0) {
                    return packagesData;
                }
                else {
                    throw new Error("No packages found");
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    markDelivered(deliverymanId, packageId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deliveryman = yield this.findDeliveryManById(deliverymanId);
                const packageIndex = deliveryman.packages.findIndex((pkg) => pkg.toString() === packageId);
                if (packageIndex !== -1) {
                    const foundPackage = yield Package_model_1.default.findById(packageId);
                    if (foundPackage) {
                        foundPackage.is_delivered = true;
                        yield foundPackage.save();
                    }
                    else {
                        throw new Error("Package not found in the database");
                    }
                }
                else {
                    throw new Error("Package not found in deliveryman packages");
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
DeliveryManService.instance = null;
exports.default = DeliveryManService;
