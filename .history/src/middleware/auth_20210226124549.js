const { request } = require('express');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'Thisismynodejscourse');
        const user;
        console.log(token);
    } catch (e) {
        console.log(e);
        res.status(401).send(e);
    }
    next();
}

module.exports = auth;