"use strict";

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("Users", [
      {
        full_name: "admin",
        gender: "male",
        email: "admin@gmail.com",
        password: await bcrypt.hash("admin123", 10),
        role: "admin",
        balance: 0,
        createdAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
