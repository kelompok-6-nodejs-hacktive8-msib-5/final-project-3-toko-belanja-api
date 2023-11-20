import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize/sequelize-config.js";
import moment from "moment-timezone";

moment.tz.setDefault("Asia/Jakarta");

export const user = sequelize.define(
  "User",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 255],
      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["male", "female"]],
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["admin", "customer"]],
      },
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        isInt: true,
        min: 0,
        max: 100000000,
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    hooks: {
      beforeCreate: (user) => {
        user.balance = 0;
      },
    },
  }
);

export const product = sequelize.define("Product", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isNumeric: true,
      isInt: true,
      min: 0,
      max: 50000000,
    },
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isNumeric: true,
      isInt: true,
    },
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

export const category = sequelize.define(
  "Category",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    sold_product_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        isInt: true,
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    hooks: {
      beforeCreate: (category) => {
        category.sold_product_amount = 0;
      },
    },
  }
);

export const transactionHistory = sequelize.define("TransactionHistory", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isNumeric: true,
      isInt: true,
    },
  },
  total_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isNumeric: true,
      isInt: true,
    },
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

user.hasMany(transactionHistory, { foreignKey: "UserId" });
transactionHistory.belongsTo(user, { foreignKey: "UserId" });

category.hasMany(product, { foreignKey: "CategoryId" });
product.belongsTo(category, { foreignKey: "CategoryId" });

product.hasMany(transactionHistory, { foreignKey: "ProductId" });
transactionHistory.belongsTo(product, { foreignKey: "ProductId" });

sequelize
  .sync()
  .then(() => {
    console.log("Model created");
  })
  .catch((error) => {
    console.error("Something happen with model :", error);
  });
