import { Sequelize } from "sequelize";

const db = process.env.DB_URL;

// db url local = postgresql://yourusername:yourpassword@localhost:5432/yourdb

export const sequelize = new Sequelize(db);
