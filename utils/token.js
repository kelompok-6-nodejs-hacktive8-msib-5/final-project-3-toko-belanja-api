import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY_JWT;

export const generateToken = (id, role) => {
  const payload = {
    id: id,
    role: role,
  };

  return jwt.sign(payload, secretKey);
};
