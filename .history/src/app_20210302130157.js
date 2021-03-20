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



const main = async() => {
    // const task = await Task.findById('603de4d59bb1cf99f83452db');
    // await task.populate('owner').execPopulate();
    // console.log(task)

    const user = await User.findById('603de4c89bb1cf99f83452d9');
    await user.populate('myTasks').execPopulate();
    console.log(user);
}

main()