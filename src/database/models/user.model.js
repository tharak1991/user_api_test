const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {userType} = require("../../utils/enum");

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true , unique: true},
    phone: {type: String, required: true , unique: true},
    password: {type: String},
    addedDate: {type: Date, required: true, default: new Date()},
    lastActive: {type: Date, required: true, default: new Date()},
});

// userSchema.path('email').validate(function (value, next) {
//     if (!value) {
//         return next();
//     }
//     mongoose.models['user'].findOne({email: value}, function (err, found) {
//         if (err) {
//             return next(false);
//         }

//         if (found && found.email) {
//             return next(false, "Already exist");
//         } else {
//             return next();
//         }
//     });

// });

module.exports = mongoose.model('user', userSchema, 'user');
