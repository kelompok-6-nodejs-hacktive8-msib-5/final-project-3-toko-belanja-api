import express from "express";
import {
  loginController,
  registerController,
} from "../controller/user-controller.js";

export const publicRouter = express.Router();

publicRouter.post("/users/register", registerController);
publicRouter.post("/users/login", loginController);
