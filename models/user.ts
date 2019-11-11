import mongoose = require('mongoose');
import {Schema} from "mongoose";

/**
 * Definition of user schema
 */
let UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    pass: { type: String, required: true }
});
/**
 * Export the user schema
 * @type {Model}
 */
module.exports = mongoose.model('User', UserSchema);
