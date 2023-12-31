"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const userController_1 = require("./controller/userController");
const AuthController_1 = require("./controller/AuthController");
const auth_1 = require("./middlewares/auth");
const userController = new userController_1.UserController();
const authController = new AuthController_1.AuthController();
exports.router = (0, express_1.Router)();
exports.router.post("/create", userController.store);
exports.router.get("/users", auth_1.AuthMiddleware, userController.index);
exports.router.post("/auth", authController.authenticate);
