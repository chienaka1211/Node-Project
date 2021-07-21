const Joi = require('joi');


const createProduct = {
    body: Joi.object().keys({
        productCode: Joi.required(),
        name: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string().optional()
    })
}

const getProduct = {
    params: Joi.object().keys({
        id: Joi.number()
    })
}

const updateProduct = {
    params: Joi.object().keys({
        id: Joi.number().integer()
    }),
    body: Joi.object().keys({
        productCode: Joi.required(),
        name: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string().optional()
    })
}

const deleteProduct = {
    params: Joi.object().keys({
        id: Joi.number().integer(),
    })
}

module.exports = {
    createProduct: createProduct,
    getProduct: getProduct,
    deleteProduct: deleteProduct,
    updateProduct: updateProduct
}

