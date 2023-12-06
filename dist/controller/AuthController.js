"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const prisma_1 = require("../utils/prisma");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const logger_1 = __importDefault(require("../libLog/logger"));
class AuthController {
    async authenticate(req, res) {
        const { email, password } = req.body;
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res.status(400).json({ error: "User not exists" });
        }
        const isValuePassword = await (0, bcryptjs_1.compare)(password, user.password);
        if (!isValuePassword) {
            return res.status(400).json({ error: "Password incorrect" });
        }
        const secretKey = process.env.TOKENHex;
        if (!secretKey) {
            return res.status(500).json({ error: "Internal server error" });
        }
        const token = (0, jsonwebtoken_1.sign)({ id: user.id }, secretKey, { expiresIn: "1d" });
        const { id } = user;
        const logMessage = {
            timeStamps: new Date().toLocaleDateString(),
            event: "Tentativa de login",
            email,
            success: isValuePassword,
            ipAddress: req.ip,
        };
        logger_1.default.info(JSON.stringify(logMessage));
        return res.json({ user: { id, email }, token });
    }
}
exports.AuthController = AuthController;
