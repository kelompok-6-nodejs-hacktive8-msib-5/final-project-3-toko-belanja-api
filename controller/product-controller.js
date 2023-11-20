import {
  createProduct,
  getProduct,
  updateProduct,
  updateProductCategory,
  removeProduct,
} from "../service/product-service.js";

export const createProductController = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;

    const result = await createProduct(user, request);

    res.status(201).send(result);
  } catch (e) {
    next(e);
  }
};

export const getProductController = async (req, res, next) => {
  try {
    const user = req.user;

    const result = await getProduct(user);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};

export const updateProductController = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    user.productId = req.params.productId;

    const result = await updateProduct(user, request);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};

export const updateProductCategoryController = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    user.productId = req.params.productId;

    const result = await updateProductCategory(user, request);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};

export const removeProductController = async (req, res, next) => {
  try {
    const user = req.user;
    user.productId = req.params.productId;

    const result = await removeProduct(user);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};
