"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'API De Fast Delivery',
            description: 'Esta API se encarga de manejar los datos de Fast delivery',
            version: '1.12.0',
        },
    },
    servers: [
        {
            url: 'http://localhost:3001',
        },
    ],
    basePath: '/api',
    apis: [
        path_1.default.resolve(__dirname, './deliverymanDocs/deliverymanRoutes.yml'),
        path_1.default.resolve(__dirname, './deliverymanDocs/deliverymanSchema.yml'),
        path_1.default.resolve(__dirname, './packagesDocs/packageRoutes.yml'),
        path_1.default.resolve(__dirname, './packagesDocs/packageSchema.yml'),
        path_1.default.resolve(__dirname, './userDocs/userRoutes.yml'),
        path_1.default.resolve(__dirname, './userDocs/userSchema.yml')
    ],
};
exports.default = options;
