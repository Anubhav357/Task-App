const express = require('express');

app.post('/users', async(req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/users', async(req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(400).send();
    }

})

app.get('/users/:id', async(req, res) => {
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

app.patch('/users/:id', async(req, res) => {
    const propertyAllowedChange = ['age', 'name', 'password', 'email'];
    const propertyPresent = Object.keys(req.body);
    var check = propertyPresent.every((property) => {
        return propertyAllowedChange.includes(property);
    });
    if (!check) {
        return res.status(400).send('Wrong property mentioned');
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user)
            return res.status(404).send();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send();
    }
});

app.delete('/users/:id', async(req, res) => {
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