const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const redis_subscriber = require('./redis/subscriber');

const user_route = require('./routes/user.route');


const app = express();

app.use(bodyParser.json({
    limit: '50mb',
    extended: true,
}));

app.use(bodyParser.urlencoded({
    extended: false,
    parameterLimit: 100000,
    limit: '50mb',
}));

app.use(compression());
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));


/***
 * User Model Routes
 */
app.use('/user', user_route); 


app.use('*', (req, res) => {
    res.sendStatus(404);
});

redis_subscriber.subscribeUserInfoReq();

module.exports = app;
