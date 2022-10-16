const ItemsService = require('../services/psql/itemsService');
const { Success, Created } = require('../helpers/responses/SuccessResponses');
const { BadRequest } = require('../helpers/responses/ErrorResponses');

const clearStr = (str) => {
  if (!str) return str;

  const newStr = str.trim().toLocaleLowerCase();

  return newStr[0].toUpperCase() + newStr.slice(1);
};

const createPayload = (payload) => {
  const newPayload = {};
  Object.keys(payload).forEach((key) => {
    if (key !== 'category' && key !== 'name' && key !== 'price') return;
    newPayload[key] = typeof payload[key] === 'number' ? payload[key] : clearStr(payload[key]);
  });
  return newPayload;
};

const addUniqueFieldsToData = async (payload) => {
  const uniqueCategories = await ItemsService.uniqueByColumn('category', 'category');
  const uniqueNames = await ItemsService.uniqueByColumn('name', 'name');
  return {
    items: payload,
    categories: uniqueCategories.map((item) => item.category),
    names: uniqueNames.map((item) => item.name),
  };
};

const allItemsController = async (req, res, next) => {
  try {
    const allItems = await ItemsService.get({ order: ['category'] });

    const data = await addUniqueFieldsToData(allItems);

    res.sendWithStatus(Success(data));
  } catch (err) {
    next(err.message);
  }
};

const createItemController = async (req, res, next) => {
  try {
    const { category, name, price } = req.body;

    const clearCategory = clearStr(category);
    const clearName = clearStr(name);

    const newItem = await ItemsService.add(
      { category: clearCategory, name: clearName, price },
    );

    const data = await addUniqueFieldsToData(newItem);

    res.sendWithStatus(Created(data));
  } catch (err) {
    next(err);
  }
};

const updateItemController = async (req, res, next) => {
  try {
    const payload = req.body;
    const { itemId } = req.params;

    const item = await ItemsService.getOne({ where: { itemId } });
    if (!item) return next(BadRequest('Such Item doesn\'t exists'));

    const newPayload = createPayload(payload);

    const updatedItem = await item.update(newPayload);

    const data = await addUniqueFieldsToData(updatedItem);

    res.sendWithStatus(Success(data));
  } catch (err) {
    next(err);
  }
};

const removeItemController = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    const item = await ItemsService.getOne({ where: { itemId } });
    if (!item) return next(BadRequest('Such Item doesn\'t exists'));

    await item.destroy();

    res.sendWithStatus(Success('Removed'));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createItemController,
  updateItemController,
  allItemsController,
  removeItemController,
};
