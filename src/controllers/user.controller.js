const {user_model} = require("../database/models");
const {userType} = require("../utils/enum");

exports.getFinalData = (body, type) => {
    return {
        name: body.name,
        email: body.email,
        phone: body.phone,
        password: body.password || null,
        addedDate: new Date(),
    };
};

exports.checkPassword = password => {
    if (password.length > 8) {
        return true;
    } else {
        throw "PASSWORD DONT MEET POLICY!";
    }
};

exports.save = data => new user_model(data).save();

exports.login = (email, password) => user_model.findOne({
    $and: [
        {email: email},
        {password: password}
    ]
}).exec();

exports.verifyUser = async (userId) => {
    await user_model.findByIdAndUpdate(userId, {$set: {verified: true}})
};

exports.getById = async id => {
    let user = await user_model.findById(id);
    delete user.password;
    return user;
}


exports.getAllUsers = async () => {
    let user = await user_model.find();
    delete user.password;
    return user;
}
