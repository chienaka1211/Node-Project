import express from 'express';

const productValidation = require('../validations/product.validation');


const router = express.Router();
import productController from '../controllers/product.controller'
import validate from "../middlewares/validate";
import checkAuthToken from "../middlewares/checkAuthToken"
/* GET users listing. */


router.delete('/:id', checkAuthToken.checkAuth, validate(productValidation.deleteProduct), productController.deleteProduct);
router.put('/:id', checkAuthToken.checkAuth, validate(productValidation.updateProduct), productController.updateProduct);
router.get('/', checkAuthToken.checkAuth, productController.getProducts);
router.get('/:id', checkAuthToken.checkAuth, validate(productValidation.getProduct), productController.getProduct);
router.post('/', checkAuthToken.checkAuth, validate(productValidation.createProduct), productController.createProduct);

module.exports = router;
