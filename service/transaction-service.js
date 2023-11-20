import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js";
import { transactionValidation } from "../validation/transaction-validation.js";
import {
  product as productModel,
  user as userModel,
  category as categoryModel,
  transactionHistory as transactionHistoryModel,
} from "../model/sequelize-model.js";
import { generateRupiah } from "../utils/rupiah-format.js";
import { formatWaktu } from "../utils/waktu-format.js";

export const createTransaction = async (user, request) => {
  const { id } = user;

  const transaction = validate(transactionValidation, request);

  const { productId, quantity } = transaction;

  const product = await productModel.findOne({ where: { id: productId } });

  if (!product) {
    throw new ResponseError(404, "Product not found");
  }

  const { title, stock, price, CategoryId } = product;

  if (quantity > stock) {
    throw new ResponseError(404, "Insufficient product stock");
  }

  const totalPrice = quantity * price;

  const userTransaction = await userModel.findOne({ where: { id } });

  if (!userTransaction) {
    throw new ResponseError(404, "User not found");
  }

  const { balance } = userTransaction;

  if (balance < totalPrice) {
    throw new ResponseError(400, "Insufficient balance");
  }

  const updatedStock = stock - quantity;

  const updatedBalance = balance - totalPrice;

  const category = await categoryModel.findOne({ where: { id: CategoryId } });

  if (!category) {
    throw new ResponseError(404, "Category not found");
  }

  const { sold_product_amount: soldProductAmount } = category;

  const updatedSoldProductAmount = soldProductAmount + quantity;

  const [{ count: countProduct }] = await productModel.update(
    {
      stock: updatedStock,
    },
    { where: { id: productId } }
  );

  if (countProduct === 0) {
    throw new ResponseError(404, "Product not found");
  }

  const [{ count: countUser }] = await userModel.update(
    { balance: updatedBalance },
    { where: { id } }
  );

  if (countUser === 0) {
    throw new ResponseError(404, "User not found");
  }

  const [{ count: countCategory }] = await categoryModel.update(
    {
      sold_product_amount: updatedSoldProductAmount,
    },
    { where: { id: CategoryId } }
  );

  if (countCategory === 0) {
    throw new ResponseError(404, "Category not found");
  }

  const formatTotalPrice = generateRupiah(totalPrice);

  await transactionHistoryModel.create({
    quantity,
    total_price: totalPrice,
    UserId: id,
    ProductId: productId,
  });

  return {
    message: "You have successfully purchase the product",
    transactionBill: {
      total_price: `${formatTotalPrice}`,
      quantity,
      product_name: title,
    },
  };
};

export const getTransactionUser = async (user) => {
  const { id } = user;

  const transactionUser = await transactionHistoryModel.findAll({
    where: { UserId: id },
    include: [{ model: productModel }],
  });

  const formattedTransactionHistories = transactionUser.map(
    ({ quantity, total_price, createdAt, updatedAt, UserId, Product }) => {
      const { id: productId, title, price, stock, CategoryId } = Product;

      const formattedTotalPrice = generateRupiah(total_price);
      const formattedPriceProduct = generateRupiah(price);
      const formattedCreatedAt = formatWaktu(createdAt);
      const formattedUpdatedAt = formatWaktu(updatedAt);

      return {
        ProductId: productId,
        UserId,
        quantity,
        total_price: formattedTotalPrice,
        createdAt: formattedCreatedAt,
        updatedAt: formattedUpdatedAt,
        Product: {
          id: productId,
          title,
          price: formattedPriceProduct,
          stock,
          CategoryId,
        },
      };
    }
  );

  return { transactionHistories: formattedTransactionHistories };
};

export const getTransactionAdmin = async (user) => {
  const { role } = user;

  if (role !== "admin") {
    throw new ResponseError(401, "Unathorized, only admin can access");
  }

  const transactionUser = await transactionHistoryModel.findAll({
    include: [
      { model: productModel },
      {
        model: userModel,
        attributes: ["id", "email", "balance", "gender", "role"],
      },
    ],
  });

  if (!transactionUser) {
    throw new ResponseError(404, "Transaction not found");
  }

  const mappedTransactionHistories = transactionUser.map(
    ({
      ProductId,
      quantity,
      total_price,
      createdAt,
      updatedAt,
      UserId,
      Product,
      User,
    }) => {
      const { id: productId, title, price, stock, CategoryId } = Product;
      const { id: userId, email, balance, gender, role } = User;

      const formattedTotalPrice = generateRupiah(total_price);
      const formattedPriceProduct = generateRupiah(price);
      const formattedBalanceUser = generateRupiah(balance);
      const formattedCreatedAt = formatWaktu(createdAt);
      const formattedUpdatedAt = formatWaktu(updatedAt);

      return {
        ProductId,
        UserId,
        quantity,
        total_price: formattedTotalPrice,
        createdAt: formattedCreatedAt,
        updatedAt: formattedUpdatedAt,
        Product: {
          id: productId,
          title,
          price: formattedPriceProduct,
          stock,
          CategoryId,
        },
        User: {
          id: userId,
          email,
          balance: formattedBalanceUser,
          gender,
          role,
        },
      };
    }
  );

  return { transactionHistories: mappedTransactionHistories };
};

export const getTransactionId = async (user) => {
  const { transactionId, id, role } = user;

  let whereCondition = { id: transactionId };

  if (role !== "admin") {
    whereCondition.UserId = id;
  }

  const transaction = await transactionHistoryModel.findOne({
    where: whereCondition,
    include: {
      model: productModel,
    },
  });

  if (!transaction) {
    throw new ResponseError(404, "Transaction not found");
  }

  const {
    quantity,
    total_price,
    createdAt,
    updatedAt,
    UserId,
    ProductId,
    Product,
  } = transaction;
  const { id: productId, title, price, stock, CategoryId } = Product;

  const formattedTotalPrice = generateRupiah(total_price);
  const formattedProductPrice = generateRupiah(price);
  const formattedCreatedAt = formatWaktu(createdAt);
  const formattedUpdatedAt = formatWaktu(updatedAt);

  return {
    ProductId,
    UserId,
    quantity,
    total_price: formattedTotalPrice,
    createdAt: formattedCreatedAt,
    updatedAt: formattedUpdatedAt,
    Product: {
      id: productId,
      title,
      price: formattedProductPrice,
      stock,
      CategoryId,
    },
  };
};
