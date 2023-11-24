import { z } from "zod";

export const createProductValidation = z.object({
  title: z
    .string({ required_error: "title is required" })
    .max(100, { message: "title should no be longer than 100 characters" }),
  price: z
    .number({
      required_error: "price is required",
      invalid_type_error: "price must be number",
    })
    .min(0, { message: "price not less than 0" })
    .max(50000000, { message: "price no more than 50000000" }),
  stock: z
    .number({
      required_error: "stock is required",
      invalid_type_error: "stock must be number",
    })
    .min(5, { message: "stock not less than 5" }),
  CategoryId: z.number({
    required_error: "CategoryId is required",
    invalid_type_error: "CategoryId must be number",
  }),
});

export const updateProductValidation = z.object({
  title: z
    .string({ required_error: "title is required" })
    .max(100, { message: "title should no be longer than 100 characters" }),
  price: z
    .number({
      required_error: "price is required",
      invalid_type_error: "price must be number",
    })
    .min(0, { message: "price not less than 0" }),
  stock: z
    .number({
      required_error: "stock is required",
      invalid_type_error: "stock must be number",
    })
    .min(0, { message: "stock not less than 0" }),
});

export const updateProductCategoryValidation = z.object({
  CategoryId: z.number({
    required_error: "CategoryId is required",
    invalid_type_error: "CategoryId must be number",
  }),
});
