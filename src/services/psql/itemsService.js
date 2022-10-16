const ModelService = require('./modelService');
const ItemsModel = require('../../db/models/itemsModel');

class ItemsService extends ModelService {
  constructor() {
    super(ItemsModel);
  }

  uniqueByColumn = (attribute, order) => this.get({
    attributes: [attribute],
    order: [order],
    group: [[order, 'ASC']],
  });
}

module.exports = new ItemsService();
