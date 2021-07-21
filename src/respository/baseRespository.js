const postgres = require('../config/connectDB').getInstance()


function getSequelize() {
    return postgres;
}


const getTransaction = async () => {
    return await postgres.transaction();
}


module.exports = {
    getTransaction
}