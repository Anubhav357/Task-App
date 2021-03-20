const { request } = require('express');
const jwt = require('jsonwebtoken');
const user = require('../router/user');
const auth = async(req, res, next) => {
    try {
        const token = req.headers('A');
        console.log(token);
    } catch (e) {
        console.log(e);
        res.status(401).send(e);
    }
    next();
}

module.exports = auth;