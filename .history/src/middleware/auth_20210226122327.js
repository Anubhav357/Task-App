const { request } = require('express');
const jwt = require('jsonwebtoken');

const auth = async(req, res, next) => {
    try {
        const token = request.header('Authorization').replace('bearer', '');
        console.log(token);
    }
    next();
}

module.exports = auth;