import orderService from '../services/order.service';
import httpStatus from 'http-status-codes';
import {Base64} from 'js-base64';

const createOrder = async (req, res) => {
    try {
        let data = await orderService.createOrder(req.body)
        console.log('+++++++++data create order++++++++', data);
        res.status(httpStatus.CREATED).json(data)
    } catch (e) {
        // console.log('>>>>>>>>',e.statusCode)
        res.status(e.statusCode).send(e.message)
    }

}
const addProduct = async (req, res) => {
    try {
        let data = await orderService.addProduct(req.body)
        res.send(data)
    } catch (e) {
        console.log(e)
        res.status(e.statusCode).send(e.message)
    }
}

const removeProduct = async (req, res) => {
    try {
        let data = await orderService.removeProduct(req.body)
        res.status(httpStatus.ACCEPTED).send(data)
    } catch (e) {
        console.log(e)
        res.status(e.statusCode).send(e.message)
    }
}

const getOrders = async (req, res) => {
    try {
        let data = await orderService.getOrders();
        res.status(httpStatus.OK).json(data)
    } catch (e) {
        res.status(e.statusCode).send(e.message)
    }

}
const getOrder = async (req, res) => {
    try {
        let data = await orderService.getOrder({id: req.params.id})
        res.status(httpStatus.OK).json(data)
    } catch (e) {
        res.status(e.statusCode).send(e.message);
    }

}

const paymentOrder = async (req, res) => {
    try {
        let status = Base64.encode(JSON.stringify(req.body));
        console.log('>>>>>>>>>>>>>>>>>>>>>', status)
        let data = await orderService.paymentOrder(status);
        console.log('>>>>>>>>>>>', data)

        res.status(httpStatus.OK).send(data)
    } catch (e) {
        console.log(e)
    }

}


module.exports = {
    addProduct,
    removeProduct,
    getOrders,
    getOrder,
    paymentOrder,
    createOrder
}






