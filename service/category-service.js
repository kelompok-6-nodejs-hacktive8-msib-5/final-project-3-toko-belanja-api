import { ResponseError } from "../error/response-error.js";
import {
  category as categoryModel,
  product as productModel,
} from "../model/sequelize-model.js";
import { validate } from "../validation/validation.js";
import { categoryValidaton } from "../validation/category-validation.js";
import { formatWaktu } from "../utils/waktu-format.js";
import { generateRupiah } from "../utils/rupiah-format.js";

export const createCategory = async (user, request) => {
  const { role } = user;

  if (role !== "admin") {
    throw new ResponseError(401, "Unathorized, only admin can access");
  }

  const category = validate(categoryValidaton, request);

  category.sold_product_amount = 0;

  const newCategory = await categoryModel.create(category, { returning: true });

  const formattedCreatedAt = formatWaktu(newCategory.createdAt);
  const formattedUpdatedAt = formatWaktu(newCategory.updatedAt);

  return {
    category: {
      id: newCategory.id,
      type: newCategory.type,
      createdAt: formattedCreatedAt,
      updatedAt: formattedUpdatedAt,
      sold_product_amount: Number(newCategory.sold_product_amount),
    },
  };
};

export const getCategory = async (user) => {
  const { role } = user;

  if (role !== "admin") {
    throw new ResponseError(401, "Unathorized, only admin can access");
  }

  const category = await categoryModel.findAll({
    include: [{ model: productModel }],
  });

  if (!category) {
    throw new ResponseError(404, "category not found");
  }

  const mappedCategories = category.map(
    ({ id, type, sold_product_amount, createdAt, updatedAt, Products }) => {
      const mappedProducts = Products.map(
        ({
          id: productId,
          title,
          price,
          stock,
          createdAt: productCreatedAt,
          updatedAt: productUpdatedAt,
          CategoryId: productCategoryId,
        }) => {
          const formatPrice = generateRupiah(price);
          const formattedCreatedAt = formatWaktu(productCreatedAt);
          const formattedUpdatedAt = formatWaktu(productUpdatedAt);

          return {
            productId,
            title,
            price: formatPrice,
            stock,
            productCreatedAt: formattedCreatedAt,
            productUpdatedAt: formattedUpdatedAt,
            productCategoryId,
          };
        }
      );

      const formattedCreatedAt = formatWaktu(createdAt);
      const formattedUpdatedAt = formatWaktu(updatedAt);

      return {
        id,
        type,
        sold_product_amount,
        createdAt: formattedCreatedAt,
        updatedAt: formattedUpdatedAt,
        Products: mappedProducts,
      };
    }
  );

  return { categories: mappedCategories };
};

export const updateCategory = async (user, request) => {
  const { role, categoryId } = user;

  if (role !== "admin") {
    throw new ResponseError(401, "Unathorized, only admin can access");
  }

  const category = validate(categoryValidaton, request);

  const [count, updatedCategory] = await categoryModel.update(category, {
    where: { id: categoryId },
    returning: true,
  });

  if (count === 0) {
    throw new ResponseError(404, "category not found");
  }

  const { id, type, sold_product_amount, createdAt, updatedAt } =
    updatedCategory[0].dataValues;

  const formattedCreatedAt = formatWaktu(createdAt);
  const formattedUpdatedAt = formatWaktu(updatedAt);

  return {
    category: {
      id,
      type,
      sold_product_amount,
      createdAt: formattedCreatedAt,
      updatedAt: formattedUpdatedAt,
    },
  };
};

export const removeCategory = async (user) => {
  const { role, categoryId } = user;

  if (role !== "admin") {
    throw new ResponseError(401, "Unathorized, only admin can access");
  }

  const category = await categoryModel.destroy({ where: { id: categoryId } });

  if (category === 0) {
    throw new ResponseError(404, "category not found");
  }

  return { message: "Category has been successfully deleted" };
};
