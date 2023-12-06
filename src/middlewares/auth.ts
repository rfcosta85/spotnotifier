import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};
export function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authorization.split(" ");
  const secretKey = process.env.TOKENHex;

  try {
    if (secretKey) {
      const decoded = verify(token, secretKey);
      const { id } = decoded as TokenPayload;
      req.user_id = id;
      next();
    } else {
      throw new Error("Secret key is undefined");
    }
  } catch (error) {
    // Handle the error here
  }
}
