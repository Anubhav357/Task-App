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

router.get('/users/logout', auth, async(req, res) => {
    try {
        const user = req.user;
        const Token = req.token;
        user.tokens = user.tokens.filter((token) => {
            return token.token !== Token;
        });
        await user.save()
        res.send('Log out successfully');
    } catch (e) {
        res.status(401).send(e);
    }
})

router.get('/users/logoutALL', auth, async(req, res) => {
    try {
        const user = req.user;
        const Token = req.token;
        user.tokens = [];

        await user.save();
        res.send('logout from all devices is completed successfully');
    } catch (e) {
        res.status(401).send('Please authenticate yourself');
    }
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

router.patch('/users/me', auth, async(req, res) => {
    const propertyAllowedChange = ['age', 'name', 'password', 'email'];
    const propertyPresent = Object.keys(req.body);
    var check = propertyPresent.every((property) => {
        return propertyAllowedChange.includes(property);
    });
    if (!check) {
        return res.status(400).send('Wrong property mentioned');
    }
    try {
        propertyPresent.forEach((property) => {
            req.user[property] = req.body[property];
        });
        await req.user.save();
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(201).send(req.user);
    } catch (e) {
        res.status(400).send();
    }
});

router.delete('/users/me', auth, async(req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.params.id)
        // if (!user) {
        //     return res.status(404).send('ji')
        // }
        req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send()
    }
});

const upload = multer({
    dest: 'avatar'
});
router.post('/me/avatar', upload.single('avatar'), (req, res) => {
    res.send();
})

module.exports = router;