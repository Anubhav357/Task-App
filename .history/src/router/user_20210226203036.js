const express = require('express');
const { findById } = require('../models/user');
const User = require('../models/user');
const router = new express.Router();
const auth = require('../middleware/auth');
router.post('/users', async(req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});


router.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByCredential(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        return res.send({ user, token });
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

router.get('/users/logout', async(req, res) => {

})

router.get('/users/me', auth, async(req, res) => {
    res.send(req.user);

})

router.get('/users/:id', async(req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findOne({ _id });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/users/:id', async(req, res) => {
    const propertyAllowedChange = ['age', 'name', 'password', 'email'];
    const propertyPresent = Object.keys(req.body);
    var check = propertyPresent.every((property) => {
        return propertyAllowedChange.includes(property);
    });
    if (!check) {
        return res.status(400).send('Wrong property mentioned');
    }
    try {
        const user = await User.findById(req.params.id);
        propertyPresent.forEach((property) => {
            user[property] = req.body[property];
        });
        await user.save();
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user)
            return res.status(404).send();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send();
    }
});

router.delete('/users/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send('ji')
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router;