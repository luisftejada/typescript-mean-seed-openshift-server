"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var routes = require('./routes/index');
var _app = express();
// view engine setup
_app.set('views', path.join(__dirname, 'views'));
_app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
_app.use(bodyParser.json());
_app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
_app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', routes);
_app.get('/env', function (req, res) {
    var content = 'Version: ' + process.version + '\n<br/>\n' +
        'Env: {<br/>\n<pre>';
    //  Add env entries.
    for (var _i = 0, _a = process.env; _i < _a.length; _i++) {
        var k = _a[_i];
        content += '   ' + k + ': ' + process.env[k] + '\n';
    }
    content += '}\n</pre><br/>\n';
    res.send('<html>\n' +
        '  <head><title>Node.js Process Env</title></head>\n' +
        '  <body>\n<br/>\n' + content + '</body>\n</html>');
});
var HttpError = (function (_super) {
    __extends(HttpError, _super);
    function HttpError() {
        _super.apply(this, arguments);
    }
    return HttpError;
}(Error));
// catch 404 and forward to error handler
_app.use(function (req, res, next) {
    var err = new HttpError('Not Found');
    err.status = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (_app.get('env') === 'development') {
    _app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
_app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
exports.app = _app;
// module.exports = app;
//# sourceMappingURL=app.js.map