const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');
router.post('/tasks', auth, async(req, res) => {
    //const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });
    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/tasks', auth, async(req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(400).send();
    }

});

router.get('/tasks/:id', async(req, res) => {
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

router.patch('/tasks/:id', async(req, res) => {
    const allowedChanges = ['description', 'completed'];
    const changesDesired = Object.keys(req.body);
    const isAllowed = changesDesired.every((change) => {
        return allowedChanges.includes(change);
    });
    if (!isAllowed) {
        return res.status(400).send('This Property does not exist');
    }
    try {
        const task = await Task.findById(req.params.id);
        changesDesired.forEach((change) => {
            task[change] = req.body[change];
        });
        await task.save();
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task)
            return res.status(404).send();
        res.status(201).send(task);

    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/tasks/:id', async(req, res) => {
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

module.exports = router;