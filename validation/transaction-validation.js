import { z } from "zod";

export const transactionValidation = z.object({
  productId: z.number({
    required_error: "ProductId is required",
    invalid_type_error: "ProductId must be number",
  }),
  quantity: z
    .number({
      required_error: "quantity is required",
      invalid_type_error: "quantity must be number",
    })
    .min(0, { message: "quantity not less than 0" }),
});
