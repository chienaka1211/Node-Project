import db from '../models/index'
import {getTransaction} from "../respository/baseRespository";
import ApiError from "../utils/ApiError";
import httpStatus from 'http-status-codes';
import orderCode from '../utils/code'
import {where} from "sequelize";
import {Base64} from 'js-base64';

db.Product.belongsToMany(db.Order, {through: db.Product_Order})
db.Order.belongsToMany(db.Product, {through: db.Product_Order})

const createOrder = async (data) => {
    let product = await db.Product.findByPk(data.product_id)
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'PRODUCT DO NOT EXIST!')
    } else {
        const transaction = await getTransaction();
        try {
            let price = await db.Product.findOne({attributes: ['price'], where: {id: data.product_id}});
            let _price = price.dataValues.price;
            let quantity = data.quantity;
            console.log('>>>>>>>>>>>>quantity====', quantity)
            let order = await db.Order.create({
                order_code: orderCode.orderCode(),
                total_price: quantity * _price,
            }, {transaction});
            let product_order = await db.Product_Order.create({
                product_id: data.product_id,
                order_id: order.id,
                quantity: quantity,
                original_price: _price,
                total_price: quantity * _price
            }, {transaction});
            await transaction.commit()
            return [order, product_order];
        } catch (e) {
            console.log(e)
            await transaction.rollback()
            throw new ApiError(httpStatus.BAD_REQUEST, 'CREATE ORDER FAIL!!!')
        }
    }
}
const addProduct = async (data) => {
    let product = await db.Product.findByPk(data.product_id);

    let order = await db.Order.findByPk(data.order_id);

    if (!product || !order) {
        console.log('PRODUCT OR ORDER NOT EXIST!!')
        throw new ApiError(httpStatus.NOT_FOUND, 'PRODUCT OR ORDER DO NOT EXIST')
    } else if (order) {
        let checkStatusOrder = await db.Order.findOne({attributes: ['status'], where: {id: data.order_id}});
        let _checkStatusOrder = checkStatusOrder.dataValues.status;
        if (_checkStatusOrder === 'paid' || _checkStatusOrder === 'error') {
            throw new ApiError(httpStatus.BAD_REQUEST, 'YOU CAN NOT ADD PRODUCT TO THIS ORDER ')
        } else {
            let checkOrder = await db.Product_Order.findOne({
                where: {
                    order_id: data.order_id,
                    product_id: data.product_id
                }
            });
            // let checkOrder_id = await db.Product_Order.findAll({
            //     where: {
            //         order_id: data.order_id
            //     }
            // })
            // console.log('>>>>>>>>>>>>>>>Check>>>>>>>>>>>>>>>>', checkOrder)
            try {
                let price = await db.Product.findOne({attributes: ['price'], where: {id: data.product_id}});
                let _price = price.dataValues.price;
                if (checkOrder) {
                    let quantity = await db.Product_Order.findOne({
                        attributes: ['quantity'],
                        where: {product_id: data.product_id}
                    });
                    let _quantity = quantity.dataValues.quantity;
                    let sumQuantity = await data.quantity + _quantity;
                    console.log('-------------SUM-------------', sumQuantity)
                    let addPlus = await db.Product_Order.update({
                        quantity: sumQuantity,
                        total_price: sumQuantity * _price
                    }, {where: {product_id: data.product_id}})
                    return addPlus;
                } else {
                    //ADD NEW
                    let addNew = await db.Product_Order.create({
                        product_id: data.product_id,
                        order_id: data.order_id,
                        quantity: data.quantity,
                        original_price: _price,
                        total_price: data.quantity * _price
                    });
                    return addNew;
                }
                let sumPrice = await db.Product_Order.findAll({
                    attributes: ['total_price'],
                    where: {order_id: data.order_id}
                })
                let sum = 0;
                for (const property in sumPrice) {
                    // console.log('>>>>>>>>>>', Number(sumPrice[property].dataValues.total_price))
                    sum += Number(sumPrice[property].dataValues.total_price);
                }
                // console.log('>>>>>>>>>>>>>>>>>', sum)
                let countOrder = await db.Product_Order.count({where: {order_id: data.order_id}})
                console.log('-------------count----------', countOrder)
                let updateOrder = await db.Order.update({total_price: sum}, {where: {id: data.order_id}})
                return [updateOrder];
            } catch (e) {
                console.log(e)
                throw new ApiError(httpStatus.BAD_REQUEST, 'ADD PRODUCT FAIL!!!')
            }
        }
    }
}

const removeProduct = async (data) => {
    let product = await db.Product.findByPk(data.product_id);
    let order = await db.Order.findByPk(data.order_id)
    if (!product || !order) {
        throw new ApiError(httpStatus.NOT_FOUND, 'PRODUCT OR ORDER DO NOT EXIST');
    } else {
        try {
            let checkOrderProduct = await db.Product_Order.findOne({
                where: {
                    product_id: data.product_id,
                    order_id: data.order_id
                }
            })
            // console.log('>>>>>>>>>>>>>>check>>>>>>>>>>>>>>', checkOrderProduct)
            if (checkOrderProduct) {
                // console.log('>>>>>>>>>>Hi!>>>>>>>>>>>>>>>>')
                await db.Product_Order.destroy({where: {product_id: data.product_id, order_id: data.order_id}})
                return 'REMOVE PRODUCT SUCCESS!!!'
            } else {
                console.log('The Order do not have this product!!!!!!')
            }
        } catch (e) {
            throw new ApiError(httpStatus.BAD_REQUEST, "REMOVE FAIL!!!")
        }
    }


}

const getOrders = async () => {
    try {
        return await db.Order.findAll();
    } catch (e) {
        console.log(e);
        throw new ApiError(httpStatus.BAD_REQUEST, 'GET FAIL');
    }

}

const getOrder = async (data) => {
    try {
        let order = await db.Order.findByPk(data.id);
        if (!order) {
            throw new ApiError(httpStatus.NOT_FOUND, 'ORDER DO NOT EXIST!!!!!!');
        } else {

            let details = await db.Order.findOne({
                include: {
                    model: db.Product,
                    through: {
                        attributes: []
                    }
                }, where: {id: data.id}
            })
            return details;
        }
    } catch (e) {
        console.log(e)
        throw new ApiError(httpStatus.BAD_REQUEST, 'GET ORDER FAIL');
    }

}


const paymentOrder = async (data) => {

    try {
        let _data = JSON.parse(Base64.decode(data));
        // console.log('>>>>>>>>>xxxx>>>>>>>>', _data)
        let checkStatus = _data.status;
        // console.log('>>>>>>>check Data>>>>>>>>>>>>', checkStatus)
        if (checkStatus === 'success') {
            return await db.Order.update({
                status: 'paid'
            }, {where: {id: _data.order_id}});
        } else if (checkStatus === 'pending') {
            return await db.Order.update({
                status: 'pending'
            }, {where: {id: _data.order_id}});
        } else {
            return await db.Order.update({
                status: 'error'
            }, {where: {id: _data.order_id}});
        }
    } catch (e) {
        console.log(e)
        throw new ApiError(httpStatus.BAD_REQUEST, 'PAYMENT FAIL!!!')
    }
}


module.exports = {
    addProduct: addProduct,
    removeProduct: removeProduct,
    getOrders: getOrders,
    getOrder: getOrder,
    createOrder: createOrder,
    paymentOrder: paymentOrder
}