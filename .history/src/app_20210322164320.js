const app = require('./index');

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
const port = process.env.PORT;


app.listen(port, () => {
    console.log('Server listening at port ' + port);
});