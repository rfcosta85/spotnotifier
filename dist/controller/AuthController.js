"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const prisma_1 = require("../utils/prisma");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
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
        return res.json({ user: { id, email }, token });
    }
}
exports.AuthController = AuthController;
