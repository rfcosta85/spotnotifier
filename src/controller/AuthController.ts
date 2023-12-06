import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

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

    return res.json({ user: { id, email }, token });
  }
}
