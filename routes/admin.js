const express = require('express');

const router = express.Router();
const adminController = require('../controllers/admin')


// /admin/add-product => GET
router.get('/add-product', adminController.getAddProducts);
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProducts);
router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct)
module.exports = router;

