const express = require('express');
const router = express.Router();
import orderController from '../controllers/order.controller';
import checkAuthToken from "../middlewares/checkAuthToken";
import validate from "../middlewares/validate";

const orderValidation = require('../validations/order.validation');


router.post('/payment', orderController.paymentOrder);
router.get('/:id', checkAuthToken.checkAuth, validate(orderValidation.getOrder), orderController.getOrder);
router.get('/', checkAuthToken.checkAuth, orderController.getOrders);
router.post('/remove-product', checkAuthToken.checkAuth, validate(orderValidation.removeProduct), orderController.removeProduct);
router.post('/add-product', validate(orderValidation.addProduct), orderController.addProduct);
router.post('/', checkAuthToken.checkAuth, validate(orderValidation.createOrder), orderController.createOrder);

module.exports = router;