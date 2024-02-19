const express = require('express')
const router = express.Router();

const {getAllProducts, newProduct,getProduct,updateProduct,deleteProduct} = require('../controllers/productController')

const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/auth');

router.route('/products').get(getAllProducts);
router.route('/admin/products/new').post(isAuthenticatedUser,authorizeRoles('admin'),newProduct);
router.route('/products/:id').get(getProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct).delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);

module.exports = router