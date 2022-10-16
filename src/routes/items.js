const router = require('express').Router();

const { schemaValidator } = require('../validation/utils');
const { itemsSchema } = require('../validation/schemas');
const {
  createItemController,
  updateItemController,
  allItemsController,
  removeItemController,
} = require('../controllers/itemsController');

router.get('/', allItemsController);
router.post('/', [
  schemaValidator(itemsSchema.createItem),
  createItemController,
]);
router.patch('/:itemId', [
  schemaValidator(itemsSchema.updateItem),
  updateItemController,
]);
router.delete('/:itemId', [
  schemaValidator(itemsSchema.removeItem),
  removeItemController,
]);

module.exports = router;
