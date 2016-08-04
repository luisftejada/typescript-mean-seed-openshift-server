"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../typings/index.d.ts" />
var config_1 = require('./config');
var mongoose = require('mongoose');
var db = config_1.Config.db;
var BaseUser = (function () {
    function BaseUser(data) {
        if (data === void 0) { data = { name: "", password: "" }; }
        this.name = data.name || "";
        this.password = data.password || "";
    }
    return BaseUser;
}());
exports.BaseUser = BaseUser;
var User = (function (_super) {
    __extends(User, _super);
    function User(data) {
        if (data === void 0) { data = { name: "", password: "" }; }
        _super.call(this, data);
    }
    User.prototype.getId = function () {
        return this.id;
    };
    User.prototype.setData = function (data) {
        this.id = data.id || this.id || "";
        this.name = data.name || this.name || "";
        this.password = data.password || this.password || "";
    };
    User.prototype.toObj = function () {
        return {
            id: this.id,
            name: this.name,
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
    password: { type: String, required: true }
});
;
exports.Users = db.model('Users', userSchema);
exports.toUser = function (userDoc) {
    var newUser = new User();
    for (var p in newUser) {
        newUser[p] = userDoc[p];
    }
    return newUser;
};
exports.createUser = function (newUser, callback) {
    var baseUser = new BaseUser(newUser);
    exports.Users.create(baseUser, function (err, created_user) {
        if (err) {
            callback(err);
        }
        var newUser = exports.toUser(created_user);
        callback(null, newUser);
    });
};
// export const createUser = _createUser;
// export const toUser = _toUser;
// export const Users = _Users;
//# sourceMappingURL=models.js.map