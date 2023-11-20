import express from "express";
import {
  removeUserController,
  updateUserController,
  userTopupController,
} from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import {
  createCategoryController,
  getCategoryController,
  removeCategoryController,
  updateCatergoryController,
} from "../controller/category-controller.js";
import {
  createProductController,
  getProductController,
  removeProductController,
  updateProductCategoryController,
  updateProductController,
} from "../controller/product-controller.js";
import {
  createTransactionController,
  getTransactionAdminController,
  getTransactionIdController,
  getTransactionUserController,
} from "../controller/transaction-controller.js";

export const userRouter = express.Router();
userRouter.use(authMiddleware);

// users
userRouter.put("/users", updateUserController);
userRouter.delete("/users", removeUserController);
userRouter.patch("/users/topup", userTopupController);

// category
userRouter.post("/categories", createCategoryController);
userRouter.get("/categories", getCategoryController);
userRouter.patch("/categories/:categoryId", updateCatergoryController);
userRouter.delete("/categories/:categoryId", removeCategoryController);

// product
userRouter.post("/products", createProductController);
userRouter.get("/products", getProductController);
userRouter.put("/products/:productId", updateProductController);
userRouter.patch("/products/:productId", updateProductCategoryController);
userRouter.delete("/products/:productId", removeProductController);

// transaction
userRouter.post("/transactions", createTransactionController);
userRouter.get("/transactions/user", getTransactionUserController);
userRouter.get("/transactions/admin", getTransactionAdminController);
userRouter.get("/transactions/:transactionId", getTransactionIdController);
