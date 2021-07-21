const Joi = require('joi');

const createOrder = {
    body: Joi.object().keys({
        orderCode: Joi.required(),
        product_id: Joi.number().required(),
        order_id: Joi.number().required(),
        quantity: Joi.number().integer().required(),
    })
}
const addProduct = {
    body: Joi.object().keys({
        product_id: Joi.number().required(),
        order_id: Joi.number().required(),
        quantity: Joi.number().integer().required(),
    })
}

const removeProduct = {
    body: Joi.object().keys({
        product_id: Joi.number().required(),
        order_id: Joi.number().required(),
    })
}
const getOrder = {
    body: Joi.object().keys({
        id: Joi.number().integer().required()
    })
}
const paymentOrder = {
    body: Joi.object().keys({
        id: Joi.number().integer().required(),
        status: Joi.string().required()
    })
}

module.exports = {createOrder, getOrder, paymentOrder, addProduct, removeProduct}