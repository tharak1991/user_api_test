const {otp_model, user_model} = require("../database/models");
const email_helper = require("../helpers/email.helper");
const config = require("../config");

async function insertOTPinDB(otp, user) {
    return otp_model.create({
        code: otp,
        user: user,
    })
}

async function naturalizeExitingOTP(user) {
    return otp_model.updateMany({user}, {$set: {used: true}});
}

exports.sendOTP = async user => {
    let otp = email_helper.generateOTP(4);
    let user_data = await user_model.findById(user);
    let transporter = email_helper.getTransporter();
    const mailOptions = {
        from: `${config.mail.username}`,
        to: user_data.email,
        subject: email_helper.getTitle(otp),
        text: email_helper.getBody(otp),
    };
    await naturalizeExitingOTP();
    let info = await transporter.sendMail(mailOptions);
    let otp_data = await insertOTPinDB(otp, user_data._id);
    return {otp_data, info}
};

exports.validateOTP = (otp = 0) => {

};
