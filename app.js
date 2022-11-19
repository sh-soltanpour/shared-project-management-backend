const express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

mongoose.connect(`mongodb://${process.env.MONGO_HOST || "localhost"}:27017/shared-project-management`, function (err) {
    if (err) throw err;
});

require('./models/user');
require('./models/image');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth/index');
const imagesRouter = require('./routes/image/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/images', imagesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


// server = app.listen(PORT, () =>
//     console.log(`Server running on http://localhost:${PORT}`)
// )
let appServer = app.listen(PORT, () => console.log(`Listening at port ${PORT}`));

module.exports = appServer;