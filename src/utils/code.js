const orderCode = () => {
    let code = new Date();
    let headerCode = 'ORD';
    let orderCode = headerCode + code.getUTCFullYear() + code.getMonth() + code.getDate() + code.getHours() + code.getMinutes() + code.getSeconds();
    console.log(orderCode)
    return orderCode;
}

const categoryCode = () => {
    let code = new Date();
    let headerCode = 'CGY';
    let orderCode = headerCode + code.getUTCFullYear() + code.getMonth() + code.getDate() + code.getHours() + code.getMinutes() + code.getSeconds();
    console.log(orderCode)
    return orderCode;
}

module.exports = {
    orderCode: orderCode,
    categoryCode: categoryCode
}