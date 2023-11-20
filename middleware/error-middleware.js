import { ResponseError } from "../error/response-error.js";

export const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    res.status(err.status).json({ error: err.message }).end();
  } else if (err.name === "SequelizeUniqueConstraintError") {
    res.status(400).json({ error: err.errors[0].message }).end();
  } else {
    res.status(500).json({ error: err.message }).end();
  }
};
