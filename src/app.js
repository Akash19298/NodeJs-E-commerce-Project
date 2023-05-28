const express = require('express');

const router = require('./routes/routing');
const errorLogger = require('./utilities/errorLogger');
const requestLogger = require('./utilities/requestLogger');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);


app.listen(4000, () => {
    console.log("Server is listening at port 4000");
})

