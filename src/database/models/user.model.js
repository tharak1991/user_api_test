const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {userType} = require("../../utils/enum");

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String},
    social_id: {type: String, unique: true},
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
    verified: {type: Boolean, required: true, default: false},
    bank_country: {type: Schema.ObjectId, ref: "countries", required: true},
    addedDate: {type: Date, required: true, default: new Date()},
    lastActive: {type: Date, required: true, default: new Date()},
});

userSchema.path('email').validate(function (value, next) {
    if (!value) {
        return next();
    }
    mongoose.models['user'].findOne({email: value}, function (err, found) {
        if (err) {
            return next(false);
        }

        if (found && found.email) {
            return next(false, "Already exist");
        } else {
            return next();
        }
    });

});

module.exports = mongoose.model('user', userSchema, 'user');
