var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var main_route = require('./subapp/main/route');
var logo_route = require('./subapp/logo/route');
var admin_route = require('./subapp/admin/route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'dist/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
console.log("__dirname:"+__dirname);
app.use(express.static(path.join(__dirname, 'dist/public')));
app.use("/subapp",express.static(path.join(__dirname, 'dist/subapp')));
app.use("/views",express.static(path.join(__dirname, 'dist/views')));

/**
 * route config
 */
app.use('/', main_route);
app.use('/logo', logo_route);
app.use('/admin',admin_route);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
