"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const PackageSchema = new mongoose_1.Schema({
    client: {
        type: String,
        required: [true, 'Please enter client name'],
    },
    quantity: {
        type: Number,
        required: [true, 'Please enter quantity'],
    },
    quantity_taked: {
        type: Number,
        default: 0,
    },
    destination: {
        type: String,
        required: [true, 'Please enter a destination for your package'],
    },
    creation_date: {
        type: Date,
        default: Date.now,
    },
    is_delivered: {
        type: Boolean,
        default: false,
        required: [true, 'Please enter the package status'],
    },
    package_weight: {
        type: Number,
        default: 0,
        required: [true, 'Please enter the package weight'],
    },
    additional_information: {
        type: String,
        default: null,
    },
    deadline_date: {
        type: Date,
        default: 0,
        required: [true, 'Please enter delivery deadline'],
    },
});
const PackageModel = mongoose_1.default.model('Package', PackageSchema);
exports.default = PackageModel;
