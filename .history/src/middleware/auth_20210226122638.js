const { request } = require('express');
const jwt = require('jsonwebtoken');

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('bearer ', '');
        console.log(token);
    } catch (e) {
        res.status(401).send(e);
    }
    next();
}

module.exports = auth;