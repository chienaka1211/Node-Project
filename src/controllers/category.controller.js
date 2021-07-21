import categoryService from '../services/category.service';
import httpStatus from 'http-status-codes';


const createCategory = async (req, res) => {
    try {
        let data = await categoryService.createCategory(req.body)
        res.status(httpStatus.CREATED).send(data)
    } catch (e) {
        console.log(e)
        res.status(e.statusCode).send(e.message);
    }

}
const getCategories = () => {

}
const getCategory = () => {

}
const deleteCategory = () => {
}

const updateCategory = () => {

}

module.exports = {
    createCategory,
    getCategory,
    getCategories,
    deleteCategory,
    updateCategory
}