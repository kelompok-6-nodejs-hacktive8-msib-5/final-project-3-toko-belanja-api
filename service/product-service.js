import { ResponseError } from "../error/response-error.js";
import {
  product as productModel,
  category as categoryModel,
} from "../model/sequelize-model.js";
import { validate } from "../validation/validation.js";
import {
  createProductValidation,
  updateProductCategoryValidation,
  updateProductValidation,
} from "../validation/product-validation.js";
import { generateRupiah } from "../utils/rupiah-format.js";
import { formatWaktu } from "../utils/waktu-format.js";

export const createProduct = async (user, request) => {
  const { role } = user;

  if (role !== "admin") {
    throw new ResponseError(401, "Unathorized, only admin can access");
  }

  const product = validate(createProductValidation, request);

  const { CategoryId: CategoryIdProduct } = product;

  const findCategoryId = await categoryModel.count({
    where: { id: CategoryIdProduct },
  });

  if (!findCategoryId) {
    throw new ResponseError(404, "Category id not found");
  }

  const newProduct = await productModel.create(product);

  const { id, title, price, stock, CategoryId, updatedAt, createdAt } =
    newProduct;

  const formatPrice = generateRupiah(price);
  const formattedCreatedAt = formatWaktu(newProduct.createdAt);
  const formattedUpdatedAt = formatWaktu(newProduct.updatedAt);

  return {
    product: {
      id,
      title,
      price: formatPrice,
      stock,
      CategoryId,
      updatedAt: formattedUpdatedAt,
      createdAt: formattedCreatedAt,
    },
  };
};

export const getProduct = async () => {
  const product = await productModel.findAll();

  const mappedProducts = product.map((product) => {
    const { id, title, price, stock, createdAt, updatedAt, CategoryId } =
      product;

    const formatPrice = generateRupiah(price);
    const formattedCreatedAt = formatWaktu(createdAt);
    const formattedUpdatedAt = formatWaktu(updatedAt);

    return {
      id,
      title,
      price: formatPrice,
      stock,
      createdAt: formattedCreatedAt,
      updatedAt: formattedUpdatedAt,
      CategoryId,
    };
  });

  return { products: mappedProducts };
};

export const updateProduct = async (user, request) => {
  const { role, productId } = user;

  if (role !== "admin") {
    throw new ResponseError(401, "Unathorized, only admin can access");
  }

  const product = validate(updateProductValidation, request);

  const productExist = await productModel.count({ where: { id: productId } });

  if (productExist === 0) {
    throw new ResponseError(404, "Product id not found");
  }

  const [count, updatedProduct] = await productModel.update(product, {
    where: { id: productId },
    returning: true,
  });

  if (count === 0) {
    throw new ResponseError(404, "Product not found");
  }

  const { id, title, price, stock, CategoryId, createdAt, updatedAt } =
    updatedProduct[0].dataValues;

  const formatPrice = generateRupiah(price);
  const formattedCreatedAt = formatWaktu(createdAt);
  const formattedUpdatedAt = formatWaktu(updatedAt);

  return {
    product: {
      id,
      title,
      price: formatPrice,
      stock,
      CategoryId,
      createdAt: formattedCreatedAt,
      updatedAt: formattedUpdatedAt,
    },
  };
};

export const updateProductCategory = async (user, request) => {
  const { role, productId } = user;

  if (role !== "admin") {
    throw new ResponseError(401, "Unathorized, only admin can access");
  }

  const productCategory = validate(updateProductCategoryValidation, request);

  const { CategoryId } = productCategory;

  const category = await categoryModel.count({ where: { id: CategoryId } });

  if (category === 0) {
    throw new ResponseError(404, "Category id not found");
  }

  const product = await productModel.count({ where: { id: productId } });

  if (product === 0) {
    throw new ResponseError(404, "Product id not found");
  }

  const [count, updatedProductCategory] = await productModel.update(
    {
      CategoryId,
    },
    {
      where: {
        id: productId,
      },
      returning: true,
    }
  );

  if (count === 0) {
    throw new ResponseError(404, "Product not found");
  }

  const {
    id,
    title,
    price,
    stock,
    CategoryId: CategoryIdUpdated,
    createdAt,
    updatedAt,
  } = updatedProductCategory[0].dataValues;

  const formatPrice = generateRupiah(price);
  const formattedCreatedAt = formatWaktu(createdAt);
  const formattedUpdatedAt = formatWaktu(updatedAt);

  return {
    product: {
      id,
      title,
      price: formatPrice,
      stock,
      CategoryId: CategoryIdUpdated,
      createdAt: formattedCreatedAt,
      updatedAt: formattedUpdatedAt,
    },
  };
};

export const removeProduct = async (user) => {
  const { role, productId } = user;

  if (role !== "admin") {
    throw new ResponseError(401, "Unathorized, only admin can access");
  }

  const product = await productModel.destroy({ where: { id: productId } });

  if (product === 0) {
    throw new ResponseError(404, "product not found");
  }

  return { message: "Product has been successfully deleted" };
};
