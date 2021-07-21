import crypto from "crypto";

require('dotenv').config()

const accessToken = (token) => {
    let hash = crypto.createHash('md5').update(token).digest('hex')
    console.log('>>>>>>>>>>>>>>>>', hash)
    return hash;
}

module.exports = {
    accessToken
}