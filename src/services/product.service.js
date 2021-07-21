import db from '../models/index'

// const postgres = require('../config/connectDB').getInstance()

const {getTransaction} = require('../respository/baseRespository')

const httpStatus = require('http-status-codes');
const ApiError = require('../utils/ApiError');
db.Product.belongsToMany(db.Category, {through: db.Product_Category})
db.Category.belongsToMany(db.Product, {through: db.Product_Category})


const createProduct = async (data) => {
    const transaction = await getTransaction();

    try {
        let code = new Date()
        let name = data.name
        //create productCode
        let productCode = name.slice(0, 2).toUpperCase() + code.getMonth() + code.getDate() + code.getHours() + code.getMinutes() + code.getSeconds();
        let product = await db.Product.create({
            name: data.name,
            productCode: productCode,
            price: data.price,
            description: data.description
        }, {transaction})
        let productCategory = await db.Product_Category.create({
            product_id: product.id,
            category_id: data.category
        }, {transaction})

        await transaction.commit()
        return [product, productCategory];

    } catch (e) {
        console.log(e)
        await transaction.rollback()
        throw new ApiError(httpStatus.BAD_REQUEST, "Create Fail")
    }
}
const getProducts = async () => {
    try {
        return await db.Product.findAll()
    } catch (e) {
        console.log(e)
        throw new ApiError(httpStatus.BAD_REQUEST, "GET Fail")
    }
}

const getProductById = async (data) => {
    let product = await db.Product.findOne({
        include: {
            model: db.Category,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }, where: {
            id: data.id
        }
    })
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, "CAN NOT FOUND!!!")
    }
    return product;
}
const updateProductById = async (data, updateBody) => {
    const product = await db.Product.findByPk(data.id)
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, "CAN NOT FOUND PRODUCT!!!")
    } else {
        try {
            return await db.Product.update({
                name: updateBody.name,
                price: updateBody.price,
                description: updateBody.description
            }, {
                where: {
                    id: product.id
                }
            });
        } catch (e) {
            console.log(e)
            throw new ApiError(httpStatus.BAD_REQUEST, "Update Fail!!!!")
        }
    }

}
const deleteProduct = async (data) => {
    const product = await db.Product.findByPk(data.id)
    const transaction = await getTransaction()
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, "CAN NOT FOUND PRODUCT!!!")
    } else {
        try {
            let product_category = await db.Product_Category.destroy({where: {product_id: data.id}}, {transaction: transaction});
            let product_order = await db.Product_Order.destroy({where: {product_id: data.id}}, {transaction: transaction});
            let product = await db.Product.destroy({where: {id: data.id}}, {transaction: transaction});
            await transaction.commit();
            return [product_order, product, product_category];

        } catch (e) {
            await transaction.rollback();
            throw new ApiError(httpStatus.BAD_REQUEST, 'DELETE FAIL!!!!!')
        }
    }
}
module.exports = {
    createProduct: createProduct,
    getProducts: getProducts,
    getProductById: getProductById,
    updateProductById: updateProductById,
    deleteProduct: deleteProduct
}