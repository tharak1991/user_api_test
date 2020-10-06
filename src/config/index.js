const development = require('./development');
const production = require('./production');
const {NODE_ENV, PORT} = process.env;
const config = {
    DEV: development,
    PRO: production,
};

const final = config[NODE_ENV];


final.jwt = {
    key: "1234567890qwertyuiopasdfghjklzxcvbnm",
    valid: 60 * 60 * 24 * 15 // Sec * Min * Hour * Days // 15 days
};



final.port = PORT || 3000;

module.exports = final;
