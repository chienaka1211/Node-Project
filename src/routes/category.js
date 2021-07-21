const express = require('express');
const router = express.Router();
import categoryController from '../controllers/order.controller'
import checkAuthToken from "../middlewares/checkAuthToken"


router.get('/', (req, res) => {
    res.send('Hello!!!!!!!!!!!')
})

module.exports = router;
