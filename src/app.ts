"use strict";
import { api } from './routes';

let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

// var routes = require('./routes/index');

let _app = express();

// Determine what is the current __dirname folder
let myPath = process.argv[1];
let parts = myPath.split("/");
let myFolder = parts.slice(0,parts.length-1).join("/")

// view engine setup
_app.set('views', path.join(myFolder, 'views'));
_app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
_app.use(bodyParser.json());
_app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
_app.use(express.static(path.join(myFolder, 'public')));

_app.use('/api', api);
// app.use('/', routes);

_app.get('/env', (req, res) => {
  var content = 'Version: ' + process.version + '\n<br/>\n' +
    'Env: {<br/>\n<pre>';
  //  Add env entries.
  for (let k of process.env) {
    content += '   ' + k + ': ' + process.env[k] + '\n';
  }
  content += '}\n</pre><br/>\n';
  res.send('<html>\n' +
    '  <head><title>Node.js Process Env</title></head>\n' +
    '  <body>\n<br/>\n' + content + '</body>\n</html>');
});

_app.get('/', (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, 'public')})
})

class HttpError extends Error {
    status;
}
// catch 404 and forward to error handler
_app.use((req, res, next) => {
  var err = new HttpError('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// if (_app.get('env') === 'development') {
//   _app.use((err, req, res, next) => {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
//
// production error handler
// no stacktraces leaked to user
// _app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.send(err.message)
  // res.render('error', {
  //   message: err.message,
  //   error: {}
  //});
//});

export const app = _app
// module.exports = app;
