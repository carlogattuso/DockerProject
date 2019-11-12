"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
/**
 * Definition of user schema
 */
var UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    pass: { type: String, required: true }
});
/**
 * Export the user schema
 * @type {Model}
 */
module.exports = mongoose.model('User', UserSchema);
