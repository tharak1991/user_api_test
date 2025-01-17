const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {userType} = require("../../utils/enum");

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true },
    phone: {type: String, required: true },
    password: {type: String},
    addedDate: {type: Date, required: true, default: new Date()},
    lastActive: {type: Date, required: true, default: new Date()},
});


module.exports = mongoose.model('user', userSchema, 'user');
