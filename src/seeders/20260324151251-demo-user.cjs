'use strict';


/** @type {import('sequelize-cli').Migration} */

const bcrypt = require('bcrypt');
module.exports = {
  async up (queryInterface, Sequelize) {

    const saltRounds = 10;
    const password = await bcrypt.hash('123123',saltRounds)

    await queryInterface.bulkInsert('Users',[
      {
        email:"samir@teste.com",
        password:password,
        name:"<Samir/>",
        subtitle:"o mais foda!",
        image:"./images/perfil.jpg",
        createdAt:new Date(),
        updatedAt:new Date()

      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
