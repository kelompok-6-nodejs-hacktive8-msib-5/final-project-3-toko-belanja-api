import { user as userModel } from "../model/sequelize-model.js";
import { validate } from "../validation/validation.js";
import {
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
  userTopupValidation,
} from "../validation/user-validation.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
import { generateRupiah } from "../utils/rupiah-format.js";
import { formatWaktu } from "../utils/waktu-format.js";

export const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const { email, password, role } = user;

  const isUserExist = await userModel.count({
    where: {
      email,
    },
  });

  if (isUserExist === 1) {
    throw new ResponseError(409, "Email already registered");
  }

  user.role = "customer";
  user.balance = 0;

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;

  const newUser = await userModel.create(user);

  const formattedBalance = generateRupiah(newUser.balance);
  const formattedTime = formatWaktu(newUser.createdAT);

  return {
    user: {
      id: newUser.id,
      full_name: newUser.full_name,
      email: newUser.email,
      gender: newUser.gender,
      balance: formattedBalance,
      createdAt: formattedTime,
    },
  };
};

export const login = async (request) => {
  const user = validate(loginUserValidation, request);

  const { email, password } = user;

  const isUserValid = await userModel.findOne({ where: { email } });

  if (!isUserValid) {
    throw new ResponseError(401, "Email or password wrong");
  }

  const { id: idUser, password: passwordUser, role: roleUser } = isUserValid;

  const validPassword = await bcrypt.compare(password, passwordUser);

  if (!validPassword) {
    throw new ResponseError(401, "Email or password wrong");
  }

  const token = generateToken(idUser, roleUser);

  return { token };
};

export const updateUser = async (user, request) => {
  const userRequest = validate(updateUserValidation, request);

  const { id } = user;

  const userExist = await userModel.count({ where: { id } });

  if (userExist === 0) {
    throw new ResponseError(404, "User not found");
  }

  const [count, updatedUser] = await userModel.update(userRequest, {
    where: { id },
    returning: true,
  });

  if (count === 0) {
    throw new ResponseError(404, "User not found");
  }

  const {
    email,
    full_name,
    id: updatedIdUser,
    createdAt,
    updatedAt,
  } = updatedUser[0].dataValues;

  const formattedCreatedAt = formatWaktu(createdAt);
  const formattedupdatedAt = formatWaktu(updatedAt);

  return {
    user: {
      id: updatedIdUser,
      full_name,
      email,
      createdAt: formattedCreatedAt,
      updatedAt: formattedupdatedAt,
    },
  };
};

export const removeUser = async (user) => {
  const { id } = user;

  const userExist = await userModel.count({ where: { id } });

  if (userExist === 0) {
    throw new ResponseError(404, "User not found");
  }

  const userDeleted = await userModel.destroy({
    where: { id },
  });

  if (userDeleted === 0) {
    throw new ResponseError(404, "User not found");
  }

  return {
    message: "Your account has been successfully deleted",
  };
};

export const userTopup = async (user, request) => {
  const { id } = user;

  const userRequest = validate(userTopupValidation, request);

  const { balance: balanceRequest } = userRequest;

  const userExist = await userModel.findOne({ where: { id } });

  if (!userExist) {
    throw new ResponseError(404, "User not found");
  }

  const { balance } = userExist;

  const currentBalance = balance + Number(balanceRequest);

  const [count, updatedUser] = await userModel.update(
    { balance: currentBalance },
    { where: { id }, returning: true }
  );

  if (count === 0) {
    throw new ResponseError(404, "User not found");
  }

  const { balance: newBalance } = updatedUser[0].dataValues;

  const formatedBalance = generateRupiah(newBalance);

  return {
    message: `Your balance has been successfully updated to ${formatedBalance}`,
  };
};
