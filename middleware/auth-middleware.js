import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.get("token");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" }).end();
  }

  const secretKey = process.env.SECRET_KEY_JWT;

  jwt.verify(token, secretKey, async (error, decode) => {
    if (error) {
      return res.status(401).json({ message: "Unauthorized" }).end();
    }

    req.user = decode;

    next();
  });
};
