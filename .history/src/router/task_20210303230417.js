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
    const method = {}
    if (req.query.completed) {
        method.completed = req.query.completed === 'true'
    }
    try {
        //const tasks = await Task.find({ owner: req.user._id }); //Can use populate method
        await req.user.populate({
            path: 'tasks',
            method
        }).execPopulate();
        res.send(req.user.tasks);
    } catch (e) {
        res.status(400).send();
    }

});

router.get('/tasks/:id', auth, async(req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({ _id, owner: req.user._id });
        if (!task)
            return res.status(404).send();
        res.send(task);
    } catch (e) {
        res.status(400).send();
    }
})

router.patch('/tasks/:id', auth, async(req, res) => {
    const allowedChanges = ['description', 'completed'];
    const changesDesired = Object.keys(req.body);
    const isAllowed = changesDesired.every((change) => {
        return allowedChanges.includes(change);
    });
    if (!isAllowed) {
        console.log('HI')
        return res.status(400).send('This Property does not exist');
    }
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task)
            return res.status(404).send();
        changesDesired.forEach((change) => {
            task[change] = req.body[change];
        });
        await task.save();
        res.status(201).send(task);

    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/tasks/:id', auth, async(req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
        await task.remove();
        if (!task) {
            res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
})

module.exports = router;