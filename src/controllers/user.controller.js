const {user_model} = require("../database/models");
const {userType} = require("../utils/enum");

exports.getFinalData = (body, type) => {
    return {
        name: body.name,
        email: body.email,
        social_id: body.id,
        image: body.image,
        password: body.password || null,
        type: type,
        verified: type !== userType.EMAIL,
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

exports.login = (email, password) => user_model.findOne({
    $and: [
        {email: email},
        {password: password}
    ]
}).exec();

exports.loginSocial = ({email, provider, id}) => {
    if (provider === userType.FACEBOOK || provider === userType.INSTAGRAM) {
        return user_model.findOne({
            $and: [
                {social_id: id},
                {
                    $or: [
                        {type: userType.INSTAGRAM},
                        {type: userType.FACEBOOK}
                    ]
                }
            ]
        }).exec();
    } else {
        return user_model.findOne({
            $and: [
                {email: email},
                {
                    $or: [
                        {type: {$ne: null}},
                        {password: {$ne: null}}
                    ]
                },
            ]
        }).exec();
    }
};

exports.verifyUser = async (userId) => {
    await user_model.findByIdAndUpdate(userId, {$set: {verified: true}})
};

exports.getById = async id => {
    let user = await user_model.findById(id);
    delete user.password;
    return user;
}
