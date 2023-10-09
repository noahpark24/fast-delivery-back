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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//routes
const index_1 = __importDefault(require("./routes/index"));
//db
const db_1 = __importDefault(require("./config/db"));
//swagger
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./docs/swagger"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const dotenv_1 = __importDefault(require("dotenv"));
const server = (0, express_1.default)();
dotenv_1.default.config();
//middlewares
server.use((0, cors_1.default)({
    origin: process.env.CORS_URL,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
}));
server.use(body_parser_1.default.json());
server.use(express_1.default.json());
server.use((0, cookie_parser_1.default)());
server.use("/api", index_1.default);
server.get("/ping", (req, res) => {
    res.sendStatus(200);
});
//Swagger config
server.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup((0, swagger_jsdoc_1.default)(swagger_1.default)));
(0, db_1.default)();
server.listen(8080, "0.0.0.0", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("listening");
}));
exports.default = server;
