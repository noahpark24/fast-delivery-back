"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DeliveryMan = new mongoose_1.Schema({
    current_deliveries: {
        type: Number,
        default: 0,
        max: 10,
    },
    active: {
        type: Boolean,
        default: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    drinked_alcohol: {
        type: Boolean,
        default: false,
    },
    taked_drugs: {
        type: Boolean,
        default: false,
    },
    have_stress: {
        type: Boolean,
        default: false,
    },
    packages: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Package' }],
});
const DeliveryManModel = (0, mongoose_1.model)('Deliveryman', DeliveryMan);
exports.default = DeliveryManModel;
