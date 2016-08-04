"use strict";
/// <reference path="../typings/index.d.ts" />
var mongoose = require("mongoose");
var SEED_MODE = process.env.SEED_MODE || "prod";
var SEED_URI = process.env.SEED_URI || "undefined";
if (SEED_MODE === "dev") {
    SEED_URI = process.env.SEED_URI_DEV || "undefined";
}
if (SEED_MODE === "undefined") {
    var error = "You need to define the ENVIRONMENT variable SEED_URI";
    console.log(error);
    throw new Error(error);
}
mongoose.connect(SEED_URI);
exports.Config = {
    SEED_MODE: SEED_MODE,
    SEED_URI: SEED_URI,
    db: mongoose
};
//# sourceMappingURL=config.js.map