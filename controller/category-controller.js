import {
  createCategory,
  getCategory,
  removeCategory,
  updateCategory,
} from "../service/category-service.js";

export const createCategoryController = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;

    const result = await createCategory(user, request);

    res.status(201).send(result);
  } catch (e) {
    next(e);
  }
};

export const getCategoryController = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await getCategory(user);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};

export const updateCatergoryController = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    user.categoryId = req.params.categoryId;

    const result = await updateCategory(user, request);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};

export const removeCategoryController = async (req, res, next) => {
  try {
    const user = req.user;
    user.categoryId = req.params.categoryId;

    const result = await removeCategory(user);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};
