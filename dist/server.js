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
	var debug = __webpack_require__(12)('Server');
	var http = __webpack_require__(13);
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

	/* WEBPACK VAR INJECTION */(function(__dirname) {"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var routes_1 = __webpack_require__(2);
	var express = __webpack_require__(7);
	var path = __webpack_require__(9);
	var favicon = __webpack_require__(10);
	// var logger = require('morgan');
	// var cookieParser = require('cookie-parser');
	var bodyParser = __webpack_require__(11);
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
	_app.use('/api', routes_1.api);
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
	_app.get('/', function (req, res) {
	    res.sendFile("index.html", { root: path.join(__dirname, 'public') });
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
	exports.app = _app;
	// module.exports = app;

	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="../typings/index.d.ts" />
	var config_1 = __webpack_require__(3);
	var jwt = __webpack_require__(5);
	var passwordHash = __webpack_require__(6);
	var express = __webpack_require__(7);
	var api_router = express.Router();
	var TWO_MONTHS = 60 * 24 * 60 * 60;
	var model = __webpack_require__(8);
	api_router.get('/users', function (req, res) {
	    model.getUsers()
	        .then(function (users) {
	        res.json({ users: users });
	    });
	});
	// signin
	api_router.post('/user/signin', function (req, res) {
	    model.Users.findOne({ email: req.body.email }, function (err, user) {
	        if (err) {
	            return res.status(404).json({
	                title: 'An error ocurred',
	                error: err
	            });
	        }
	        if (!user) {
	            return res.status(404).json({
	                title: 'No user found',
	                error: { message: "can't find the user" }
	            });
	        }
	        if (!passwordHash.verify(req.body.password, user.password)) {
	            return res.status(404).json({
	                title: "Can't signin",
	                error: { message: "Invalid password" }
	            });
	        }
	        var token = jwt.sign({ user: user }, config_1.Config.SUPER_SECRET, { expiresIn: TWO_MONTHS });
	        res.status(200).json({ message: 'Success', token: token });
	    });
	});
	// this is signup
	api_router.post('/user', function (req, res) {
	    console.log("POST /api/user");
	    var hashed_password = passwordHash.generate(req.body.password);
	    model.createUser({ name: req.body.name,
	        email: req.body.email,
	        password: hashed_password })
	        .then(function (user) {
	        res.json({ user: user });
	    })
	        .catch(function (err) {
	        res.status(404).json({
	            title: "Can't create new user",
	            error: err
	        });
	    });
	});
	// TODO: Delete this route, as it is only for debuggin purposes
	api_router.get('/user/:email', function (req, res) {
	    console.log('GET /api/user/' + req.params.email);
	    model.Users.findOne({ email: req.params.email }, function (err, user) {
	        if (err) {
	            return res.status(404).json({
	                title: "Can't find user",
	                error: err
	            });
	        }
	        if (!user) {
	            return res.status(404).json({
	                title: 'No user found',
	                error: { message: "can't find the user" }
	            });
	        }
	        res.json({ message: "Succes", user: user });
	    });
	});
	exports.api = api_router;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="../typings/index.d.ts" />
	var mongoose = __webpack_require__(4);
	var secret = 't01s 1s sup3r_sup3R s3cr3tttt {!@~!!!}';
	var SEED_MODE = process.env.SEED_MODE || "prod";
	var SEED_URI = process.env.SEED_URI || "undefined";
	var SUPER_SECRET = process.env.SUPER_SECRET || secret;
	if (SEED_MODE === "dev") {
	    SEED_URI = process.env.SEED_URI_DEV || "undefined";
	}
	if (SEED_MODE === "prod") {
	    SEED_URI = process.env.SEED_URI_PROD || "undefined";
	}
	if (SEED_URI === "undefined") {
	    var error = "You need to define the ENVIRONMENT variable SEED_URI";
	    console.log(error);
	    throw new Error(error);
	}
	console.log({ MODE: SEED_MODE, URI: SEED_URI });
	console.log('connecting to mongodb on ', SEED_URI);
	mongoose.connect(SEED_URI);
	exports.Config = {
	    SUPER_SECRET: SUPER_SECRET,
	    SEED_MODE: SEED_MODE,
	    SEED_URI: SEED_URI,
	    db: mongoose
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("password-hash");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../typings/index.d.ts" />
	var config_1 = __webpack_require__(3);
	var mongoose = __webpack_require__(4);
	var db = config_1.Config.db;
	var BaseUser = (function () {
	    function BaseUser(data) {
	        if (data === void 0) { data = { email: "", name: "", password: "" }; }
	        this.name = data.name || "";
	        this.password = data.password || "";
	        this.email = data.email || "";
	    }
	    return BaseUser;
	}());
	exports.BaseUser = BaseUser;
	var User = (function (_super) {
	    __extends(User, _super);
	    function User(data) {
	        if (data === void 0) { data = { id: null, name: "", email: "", password: "" }; }
	        _super.call(this, data);
	    }
	    User.prototype.getId = function () {
	        return this.id;
	    };
	    User.prototype.setData = function (data) {
	        this.id = data.id || this.id || "";
	        this.name = data.name || this.name || "";
	        this.email = data.email || this.email || "";
	        this.password = data.password || this.password || "";
	    };
	    User.prototype.toObj = function () {
	        return {
	            id: this.id,
	            name: this.name,
	            email: this.email,
	            password: this.password
	        };
	    };
	    User.prototype.toString = function () {
	        return JSON.stringify(this.toObj());
	    };
	    return User;
	}(BaseUser));
	exports.User = User;
	// The Mongoose part of User -----------------------------
	var userSchema = new mongoose.Schema({
	    name: { type: String, required: true },
	    password: { type: String, required: true },
	    email: { type: String, required: true },
	});
	;
	exports.Users = db.model('Users', userSchema);
	exports.toUser = function (userDoc) {
	    var newUser = new User();
	    for (var p in newUser) {
	        newUser[p] = userDoc[p];
	    }
	    newUser['id'] = userDoc['_id'].toHexString();
	    return newUser;
	};
	var _createUser = function (newUser, callback) {
	    var baseUser = new BaseUser(newUser);
	    exports.Users.create(baseUser, function (err, created_user) {
	        if (err) {
	            callback(err);
	        }
	        var newUser = exports.toUser(created_user);
	        callback(null, newUser);
	    });
	};
	exports.createUser = function (baseUser) {
	    return new Promise(function (resolve, reject) {
	        console.log("creating user: ", baseUser);
	        // Check if the user already exists
	        exports.Users.findOne({ email: baseUser.email }, function (err, user) {
	            if (!user) {
	                // ok, no user, so lets create it
	                exports.Users.create(baseUser, function (err, created_user) {
	                    if (err) {
	                        console.log(err);
	                        reject(err);
	                    }
	                    else {
	                        resolve(exports.toUser(created_user));
	                    }
	                });
	            }
	            else {
	                // user already exists
	                reject({ message: "User " + baseUser.email + " already exists" });
	            }
	        });
	    });
	};
	exports.getUsers = function () {
	    // Get all users in the database
	    return new Promise(function (resolve, reject) {
	        exports.Users.find({}, function (err, users) {
	            if (err) {
	                reject(err);
	            }
	            resolve(users.map(function (userDoc) { return exports.toUser(userDoc); }));
	        });
	    });
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("serve-favicon");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("debug");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ }
/******/ ]);
