'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Contacts',[
      {
        email:"Samir@dev.com",
        whatsapp:"(82)99925-0507",
        github:"https://github.com",
        linkedin:"https://linkedIn.com",
        sectionTitle:"Seu projeto não precisa esperar mais",
        sectionSubtitle:"Me conte sua ideia — eu cuido do código.",
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
