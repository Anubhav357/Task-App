const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./router/user');
const taskRouter = require('./router/task');

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
const port = process.env.PORT || 3000;

const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a Word document'))
        }

        cb(undefined, true)
    }
})

const errorMiddleware = (req, res, next) => {
    throw new Error('Error message Lana Rhodes');
}
app.post('/upload', errorMiddleware, (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
})

app.listen(port, () => {
    console.log('Server listening at port ' + port);
});