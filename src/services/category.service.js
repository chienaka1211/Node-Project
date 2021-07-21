import db from '../models/index'
import httpStatus from "http-status-codes";
import ApiError from "../utils/ApiError";
import categoryCode from "../utils/code";
import {getTransaction} from "../respository/baseRespository";


const createCategory = async (data) => {
    try {
        let data = await db.Category.create({
            categoryCode: categoryCode.categoryCode(),
            name: data.name
        })
        return data;
    } catch (e) {
        console.log(e)
        throw new ApiError(httpStatus.BAD_REQUEST, 'CREATED FAIL!!!');
    }
}
const getCategories = async () => {
    try {
        let data = await db.Category.findAll();
        return data
    } catch (e) {
        throw new ApiError(httpStatus.BAD_REQUEST, '......loading......')
    }
}

const getCategory = async (data) => {
    let checkCategory = await db.Category.findByPk(data.id);
    if (!checkCategory) {
        throw new ApiError(httpStatus.NOT_FOUND, 'CATEGORY DO NOT EXIST!!!!!!')
    }
    try {
        let data = await db.Category.findOne({
            include: db.Product,
            through: {
                attributes: []
            }, where: {id: data.id}
        })
        return data;
    } catch (e) {
        throw new ApiError(httpStatus.NOT_FOUND, 'CAN NOT FOUND CATEGORY!!!!!!!')
    }
}
const deleteCategory = async (data) => {
    const transaction = await getTransaction();
    let checkCategory = await db.Category.findByPk(data.id);
    if (!checkCategory) {
        throw new ApiError(httpStatus.NOT_FOUND, 'CATEGORY DO NOT EXIST!!!!!!')
    }
    try {
        let product_category = await db.Product_Category.destroy({where: {category_id: data.id}}, {transaction: transaction});
        let category = await db.Category.destroy({where: {id: data.id}}, {transaction: transaction});
        await transaction.commit();
        return [product_category, category];
    } catch (e) {
        console.log(e)
        await transaction.rollback();
        throw new ApiError(httpStatus.BAD_REQUEST, 'DELETE FAIL!!!!!')
    }

}
const updateCategory = async (data) => {
    let checkCategory = await db.Category.findByPk(data.id);
    if (!checkCategory) {
        throw new ApiError(httpStatus.NOT_FOUND, 'CATEGORY DO NOT EXIST!!!!!!')
    }
    try {
        return await db.Category.update({
            name: data.name
        }, {where: {id: data.id}})
    } catch (e) {
        console.log(e)
        throw new ApiError(httpStatus.NOT_FOUND, 'CATEGORY UPDATE FAIL!!!!!!')
    }
}

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    deleteCategory,
    updateCategory
}