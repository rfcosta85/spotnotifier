"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function AuthMiddleware(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "Token not provided" });
    }
    const [, token] = authorization.split(" ");
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, "secret");
        const { id } = decoded;
        req.user_id = id;
        next();
    }
    catch (error) { }
}
exports.AuthMiddleware = AuthMiddleware;
