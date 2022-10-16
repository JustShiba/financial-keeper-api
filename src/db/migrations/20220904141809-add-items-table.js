const { ITEMS } = require('../tableNames');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(ITEMS, {
      itemId: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      category: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    });
  },
  down: (queryInterface) => queryInterface.dropTable(ITEMS),
};
