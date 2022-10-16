const router = require('express').Router();

const itemsRoutes = require('./items');

router.use('/item', [
  itemsRoutes,
]);

module.exports = router;
