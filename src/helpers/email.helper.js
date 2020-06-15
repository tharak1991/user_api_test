const nodemailer = require('nodemailer');
const config = require("../config");

exports.getTitle = otp => {
    return `${otp} is the OTP on Airbük Login!`
};

exports.getBody = otp => {
    return `${otp} is the OTP on Airbük Login!`
};


exports.generateOTP = (limit = 4) => ("" + Math.floor(Math.random() * Math.pow(10, limit))).padStart(limit, "0");


exports.getTransporter = () => {
    return nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        secureConnection: false,
        port: 587,
        tls: {
            ciphers: 'SSLv3'
        },
        auth: {
            user: config.mail.username,
            pass: config.mail.password,
        }
    });
};
