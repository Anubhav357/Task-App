const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

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
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).send();
        }
        res.send(user)
    } catch (e) {
        res.status(500).send();
    }
})
app.post('/tasks', async(req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/tasks', async(req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(400).send();
    }

});

app.get('/tasks/:id', async(req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        if (!task)
            return res.status(404).send();
        res.send(task);
    } catch (e) {
        res.status(400).send();
    }
})

app.listen(port, () => {
    console.log('Server listening at port ' + port);
});

app.patch('/tasks/:id', async(req, res) => {
    const allowedChanges = ['description', 'completed'];
    const changesDesired = Object.keys(req.body);
    const isAllowed = changesDesired.every((change) => {
        return allowedChanges.includes(change);
    });
    if (!isAllowed) {
        return res.status(400).send('This Property does not exist');
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task)
            return res.status(404).send();
        res.status(201).send(task);

    } catch (e) {
        res.status(400).send(e);
    }
});