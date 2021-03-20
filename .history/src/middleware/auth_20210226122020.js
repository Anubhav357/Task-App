const jwt = require('jsonwebtoken');

const auth = async(req, res, next) => {
    console.log('Middle ware checking');
}

module.exports = auth;