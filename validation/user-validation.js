import { z } from "zod";

export const registerUserValidation = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "email not valid" })
    .max(100, { message: "email should not be longer than 100 characters" }),
  full_name: z
    .string({ required_error: "full_name is required" })
    .max(100, { message: "fullname should not be longer than 100 characters" }),
  password: z
    .string({ required_error: "password is required" })
    .min(6, { message: "password must be at least 6 characters" })
    .max(100, { message: "password should not be longer than 100 characters" }),
  gender: z.enum(["male", "female"], {
    required_error: "gender is required",
    invalid_type_error: "gender must be male or female",
  }),
  role: z.string().optional(),
});

export const loginUserValidation = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "email not valid" })
    .max(100, { message: "email should not be longer than 100 characters" }),
  password: z
    .string({ required_error: "password is required" })
    .max(100, { message: "password should not be longer than 100 characters" }),
});

export const updateUserValidation = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "email not valid" })
    .max(100, { message: "email should not be longer than 100 characters" }),
  full_name: z.string({ required_error: "full_name is required" }).max(100, {
    message: "full_name should not be longer than 100 characters",
  }),
});

export const userTopupValidation = z.object({
  balance: z
    .number({
      required_error: "balance is required",
      invalid_type_error: "balance must be number",
    })
    .min(0, { message: "balance not less than 0" })
    .max(100000000, { message: "balance no more than 100000000" }),
});
