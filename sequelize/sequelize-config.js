import { Sequelize } from "sequelize";

const db = process.env.DB_URL;

export const sequelize = new Sequelize(db);
