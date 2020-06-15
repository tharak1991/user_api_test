const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const otpSchema = new Schema({
    code: {type: Number, minLength: 4, maxLength: 6, required: true},
    upto: {type: Date, required: true, default: new Date()},
    used: {type: Boolean, required: true, default: false},
    user: {type: Schema.ObjectId, required: true, ref: "user"},
});

module.exports = mongoose.model('otp', otpSchema, 'otp');
