import {accessToken} from '../config/token';
import httpStatus from "http-status-codes";

require('dotenv').config();


let authToken = accessToken(process.env.TOKEN);
let adminToken = accessToken(process.env.ADMIN_TOKEN);

const checkAuth = (req, res, next) => {
    let success = req.header('auth-token');
    if (!success) {
        res.status(httpStatus.UNAUTHORIZED).send('AUTHENTICATION FAIL!!!')
    } else if (success === authToken) {
        next();
    } else {
        res.status(httpStatus.UNAUTHORIZED).send('AUTHENTICATION FAIL!!!')
    }
}

const checkAdmin = (req, res, next) => {
    let success = req.header('auth-token');
    let admin = req.header('admin-token')
    if (!success) {
        res.status(httpStatus.UNAUTHORIZED).send('AUTHENTICATION FAIL!!!');
    } else if (admin === adminToken && success === authToken) {
        next();
    } else {
        res.status(httpStatus.UNAUTHORIZED).send('AUTHENTICATION FAIL!!!');
    }
}

module.exports = {
    checkAuth,
    checkAdmin
}