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


app.listen(port, () => {
    console.log('Server listening at port ' + port);
});

const bcrypt = require('bcryptjs');

const myfunction = async() => {
    const password = 'bcrpytjs';
    const hashedPassword = await bcrypt.hash(password, 8);
    console.log(password);
    console.log(hashedPassword);
    const isPassword = await bcrypt.compare('bcrpytjs', hashedPassword);
    console.log(isPassword);
}

myfunction()