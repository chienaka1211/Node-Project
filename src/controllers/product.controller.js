import productService from '../services/product.service';

const httpStatus = require('http-status-codes');


const createProduct = async (req, res) => {
    try {
        let data = await productService.createProduct(req.body);
        console.log(">>>>>>>>>>>>>>>>>>", data)
        res.status(httpStatus.CREATED).send(data)

    } catch (e) {
        res.status(e.statusCode).send(e.message);
    }
}

const getProducts = async (req, res) => {
    try {
        let data = await productService.getProducts()
        res.send(data)
    } catch (e) {
        console.log(e)
    }
}
const getProduct = async (req, res) => {

    try {
        let id = req.params.id;
        let data = await productService.getProductById({id})
        console.log('=============>', data)
        res.json(data)
    } catch (e) {
        res.status(e.statusCode).send(e.message)
        // res.send(e)
    }
}
const updateProduct = async (req, res) => {
    try {
        let id = await req.params.id
        let data = await productService.updateProductById({id}, req.body)
        console.log('--------DATA', data)
        res.status(httpStatus.CREATED).send('Update Success!!!!!!!!!')
    } catch (e) {
        res.status(e.statusCode).send(e.message)
    }
}
const deleteProduct = async (req, res) => {
    try {
        let id = await req.params.id;
        let message = await productService.deleteProduct({id})
        console.log('==================>', message)
        res.status(httpStatus.ACCEPTED).send('DELETED SUCCESS!!!!!!!!!!')
    } catch (e) {
        res.status(e.statusCode).send(e.message)
        console.log(e)
    }
}

module.exports = {
    createProduct: createProduct,
    getProducts: getProducts,
    getProduct: getProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct
}