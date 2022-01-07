const app = require('./index');

const port = process.env.PORT;


app.listen(port, () => {
    console.log('Server listening at port ' + port);
});