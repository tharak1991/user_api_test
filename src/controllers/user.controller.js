const {user_model} = require("../database/models/index");

exports.getFinalData = (body, type) => {
    return {
        name: body.name,
        email: body.email,
        image: body.image,
        password: body.password || null,
        type: "",
        bank_country: body.bank_country,
        username: body.name.toLowerCase().replace(/-/g, "").replace(/ /g, "-"),
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

exports.login = (email, password) => user_model.findOne({$and: [{email}, {password}]}).exec();
