/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'Orders',
      [
        {
          user_id: 1,
          status: 'Заказ принят',
          address: 'Улица Пушкина, дом Колотушкина',
          total: 154500,
          comments: '1 Первый заказ',
          createdAt: Sequelize.DataTypes.NOW().toString(),
          updatedAt: Sequelize.DataTypes.NOW().toString(),
        },
        {
          user_id: 1,
          status: 'Заказ принят',
          address: 'Улица Пушкина, дом Колотушкина',
          total: 154500,
          comments: '2 Заказ',
          createdAt: Sequelize.DataTypes.NOW().toString(),
          updatedAt: Sequelize.DataTypes.NOW().toString(),
        },
        {
          user_id: 2,
          status: 'Заказ принят',
          address: 'Улица Пушкина, дом Колотушкина',
          total: 4888,
          comments: '3 Заказ',
          createdAt: Sequelize.DataTypes.NOW().toString(),
          updatedAt: Sequelize.DataTypes.NOW().toString(),
        },
        {
          user_id: 3,
          status: 'Заказ принят',
          address: 'Улица Пилюгина, дом Колотушкина',
          total: 8950560,
          comments: '4 Заказ',
          createdAt: Sequelize.DataTypes.NOW().toString(),
          updatedAt: Sequelize.DataTypes.NOW().toString(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Measurements', null, {});
     */
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
