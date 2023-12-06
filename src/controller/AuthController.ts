import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import logger from "../libLog/logger";

export class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "User not exists" });
    }

    const isValuePassword = await compare(password, user.password);

    if (!isValuePassword) {
      return res.status(400).json({ error: "Password incorrect" });
    }

    const secretKey = process.env.TOKENHex;

    if (!secretKey) {
      return res.status(500).json({ error: "Internal server error" });
    }

    const token = sign({ id: user.id }, secretKey, { expiresIn: "1d" });

    const { id } = user;

    const logMessageTentativasDeLogin = {
      timeStamps: new Date().toLocaleDateString(),
      event: "Tentativa de login",
      email,
      success: isValuePassword,
      ipAddress: req.ip,
    };

    logger.info(JSON.stringify(logMessageTentativasDeLogin));

    const logMessageLogSession = {
      timestamp: new Date().toLocaleDateString(),
      event: "Session",
      email,
      action: "Session Started",
      ipAddress: req.ip,
    };

    logger.info(JSON.stringify(logMessageLogSession));

    return res.json({ user: { id, email }, token });
  }
}
