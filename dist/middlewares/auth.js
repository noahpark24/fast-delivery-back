"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = require("../config/tokens");
const responses_1 = require("../services/responses");
const response = new responses_1.Responses();
function validateUser(req, res, next) {
    const token = req.cookies.token;
    if (!token)
        return res.sendStatus(401);
    const { user } = (0, tokens_1.validateToken)(token);
    if (!user)
        return res.sendStatus(401);
    req.user = user;
    next();
}
exports.default = validateUser;
