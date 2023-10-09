"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Responses = void 0;
class Responses {
    success(res, message, statusCode) {
        return res.status(statusCode || 200).send({
            message,
        });
    }
    sendPackage(res, message, statusCode) {
        return res.status(statusCode || 200).send({
            message,
        });
    }
    sendDeliverymans(res, message, statusCode) {
        return res.status(statusCode || 200).send({
            message,
        });
    }
    error(res, message, statusCode) {
        return res.status(statusCode || 500).send({
            error: message,
        });
    }
}
exports.Responses = Responses;
