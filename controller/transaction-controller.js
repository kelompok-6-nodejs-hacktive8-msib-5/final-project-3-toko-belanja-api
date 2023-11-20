import {
  createTransaction,
  getTransactionAdmin,
  getTransactionId,
  getTransactionUser,
} from "../service/transaction-service.js";

export const createTransactionController = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;

    const result = await createTransaction(user, request);

    res.status(201).send(result);
  } catch (e) {
    next(e);
  }
};

export const getTransactionUserController = async (req, res, next) => {
  try {
    const user = req.user;

    const result = await getTransactionUser(user);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};

export const getTransactionAdminController = async (req, res, next) => {
  try {
    const user = req.user;

    const result = await getTransactionAdmin(user);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};
export const getTransactionIdController = async (req, res, next) => {
  try {
    const user = req.user;
    user.transactionId = req.params.transactionId;

    const result = await getTransactionId(user);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};
