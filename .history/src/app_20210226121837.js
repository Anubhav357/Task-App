const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./router/user');
const taskRouter = require('./router/task');

const app = express();

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET method on request are disabled ');
//     } else {
//         next();
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Right now we are doing some maintainence of the site.Please come back later');
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log('Server listening at port ' + port);
});

// const jwt = require('jsonwebtoken');

// const myFunction = async() => {
//     const token = jwt.sign({ _id: 'ABC123' }, "ThisisNodejsCourse", { expiresIn: '1 seconds' });
//     console.log(token);
//     const data = jwt.verify(token, 'ThisisNodejsCourse');
//     console.log(data);
// }

// myFunction();