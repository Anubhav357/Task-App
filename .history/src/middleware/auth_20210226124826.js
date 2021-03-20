const { request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'Thisismynodejscourse');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!user)
            throw new error()
        req.user = user;
    } catch (e) {
        res.status(401).send(e);
    }
    next();
}

module.exports = auth;