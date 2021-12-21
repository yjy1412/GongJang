'use strict';
const { DataTypes } = require('sequelize/dist');
const { UPSERT } = require('sequelize/dist/lib/query-types');
require('dotenv').config();
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_NICKNAME = process.env.ADMIN_NICKNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   if ( ADMIN_EMAIL && ADMIN_NICKNAME && ADMIN_PASSWORD ) {
    await queryInterface.bulkInsert('Users', [{
      email: ADMIN_EMAIL,
      nickname: ADMIN_NICKNAME,
      password: ADMIN_PASSWORD,
      admin: true,
      createdAt: new Date,
      updatedAt: new Date
    }])
   }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null);
  }
};
