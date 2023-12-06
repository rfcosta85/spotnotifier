"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const prisma_1 = require("../utils/prisma");
const bcryptjs_1 = require("bcryptjs");
class UserController {
    async index(req, res) {
        const users = await prisma_1.prisma.user.findMany();
        return res.json({ users });
    }
    async store(req, res) {
        const { name, email, password } = req.body;
        const userExists = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hash_password = await (0, bcryptjs_1.hash)(password, 8);
        const user = await prisma_1.prisma.user.create({
            data: {
                name,
                email,
                password: hash_password,
            },
        });
        return res.json({ user });
    }
}
exports.UserController = UserController;
