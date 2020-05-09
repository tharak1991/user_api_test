const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String},
    image: {type: String},
    password: {type: String, required: true},
    username: {type: String, required: true},
    dob: {type: Date},
    bank_country: {type: Schema.ObjectId, ref: "countries", required: true},
    addedDate: {type: Date, required: true, default: new Date()},
    lastActive: {type: Date, required: true, default: new Date()},
});

module.exports = mongoose.model('user', userSchema, 'user');
