const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {userType} = require("../../utils/enum");

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String},
    image: {type: String},
    type: {type: String, enum: [...Object.values(userType)], required: true},
    password: {type: String},
    username: {type: String, required: true},
    rating: {
        aggregate: {type: Number, default: 0},
        count: {type: Number, default: 0},
    },
    dob: {type: Date},
    bank_country: {type: Schema.ObjectId, ref: "countries", required: true},
    addedDate: {type: Date, required: true, default: new Date()},
    lastActive: {type: Date, required: true, default: new Date()},
});

module.exports = mongoose.model('user', userSchema, 'user');
