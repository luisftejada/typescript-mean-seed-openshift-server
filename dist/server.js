/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="../typings/index.d.ts" />
	var app_1 = __webpack_require__(1);
	/**
	 * Module dependencies.
	 */
	var debug = __webpack_require__(6)('Server');
	var http = __webpack_require__(7);
	/**
	 * Get port from environment and store in Express.
	 */
	var ipaddress = process.env.OPENSHIFT_NODEJS_IP ||
	    process.env.OPENSHIFT_INTERNAL_IP || "undefined";
	var port = process.env.OPENSHIFT_NODEJS_PORT ||
	    process.env.OPENSHIFT_INTERNAL_PORT || 8080;
	if (ipaddress === "undefined") {
	    //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
	    //  allows us to run/test the app locally.
	    console.warn('No OPENSHIFT_*_IP var, using 127.0.0.1');
	    ipaddress = "127.0.0.1";
	}
	app_1.app.set('port', port);
	/**
	 * Create HTTP server.
	 */
	var server = http.createServer(app_1.app);
	/**
	 * Listen on provided port, on all network interfaces.
	 */
	server.listen(port, ipaddress);
	server.on('error', onError);
	server.on('listening', onListening);
	/**
	 * Event listener for HTTP server "error" event.
	 */
	function onError(error) {
	    if (error.syscall !== 'listen') {
	        throw error;
	    }
	    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
	    // handle specific listen errors with friendly messages
	    switch (error.code) {
	        case 'EACCES':
	            console.error(bind + ' requires elevated privileges');
	            process.exit(1);
	            break;
	        case 'EADDRINUSE':
	            console.error(bind + ' is already in use');
	            process.exit(1);
	            break;
	        default:
	            throw error;
	    }
	}
	/**
	 * Event listener for HTTP server "listening" event.
	 */
	function onListening() {
	    var addr = server.address();
	    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	    var ip = ipaddress || 'http://localhost';
	    console.log("Listening on " + ip + ":" + port);
	    debug('Listening on ' + bind);
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var express = __webpack_require__(2);
	var path = __webpack_require__(3);
	var favicon = __webpack_require__(4);
	// var logger = require('morgan');
	// var cookieParser = require('cookie-parser');
	var bodyParser = __webpack_require__(5);
	// var routes = require('./routes/index');
	var _app = express();
	// Determine what is the current __dirname folder
	var myPath = process.argv[1];
	var parts = myPath.split("/");
	var myFolder = parts.slice(0, parts.length - 1).join("/");
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("serve-favicon");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("debug");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ }
/******/ ]);