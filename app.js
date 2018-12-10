var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./server/_config');
let mongoose = require('mongoose');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const picture = require('./routes/picture');
const account = require('./routes/account');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

mongoose.connect('mongodb://manager:13861426640h@ds237373.mlab.com:37373/damaskdb');
// mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
//     if(err) {
//         console.log('Error connecting to the database. ' + err);
//     } else {
//         console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
//     }
// });

//Customer
app.get('/picture', picture.findAll);
app.get('/picture/names/:name', picture.findByName);
app.get('/picture/:id/title', picture.getContent);
app.get('/picture/:id/content', picture.getContent);
app.get('/account', account.findAll);
app.get('/account/emails/:email', account.findOneByEmail);

app.post('/picture', picture.addPicture);
app.post('/account', account.addUser);

app.put('/picture/:id/addComment', picture.addComment);
app.put('/picture/:id/changeInfo', picture.changeInfo);
app.put('/account/:id/changeAvatar', account.changeAvatar);

app.delete('/picture/:id', picture.deletePicture);
app.delete('/account/:id', account.deleteUser);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
