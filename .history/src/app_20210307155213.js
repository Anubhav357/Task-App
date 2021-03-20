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

const multer = require('multer');
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

app.post('/upload', upload.single('egf'), (req, res) => {
    res.send();
});
const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log('Server listening at port ' + port);
});