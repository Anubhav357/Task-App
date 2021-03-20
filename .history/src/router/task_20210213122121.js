const express = require('express');
const router = express.Router();
const Task = require('../models/task');

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

app.delete('/tasks/:id', async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
})