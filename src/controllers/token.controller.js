const jwt = require('jsonwebtoken');
const config = require("../config");

exports.sign = data => {
    return jwt.sign({data}, config.jwt.key, {expiresIn: config.jwt.valid});
};

exports.verify = token => {
    try {
        let decoded = jwt.verify(token, config.jwt.key);
        // console.log(decoded);
        return true;
    } catch (e) {
        return false;
    }
};
