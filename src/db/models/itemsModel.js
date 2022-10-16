const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const { ITEMS } = require('../tableNames');

const ItemsModel = sequelize.define(
  ITEMS,
  {
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
  },
  {
    paranoid: false,
    timestamps: false,
  },
);

module.exports = ItemsModel;
