const router = require('express').Router();
const storeRoutes = require('./store/store.routes');
const ecommerceRoutes = require('./ecommerce/ecommerce.routes');

router.use('/ecommerce', ecommerceRoutes);
router.use('/store', storeRoutes);

module.exports = router;
