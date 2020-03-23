const development = require('./development');
const production = require('./production');
const {NODE_ENV, PORT} = process.env;
const config = {
    DEV: development,
    PRO: production,
};

const final = config[NODE_ENV];

final.flight_status = {
    url: 'https://api.flightstats.com',
    appId: 'bef06d59',
    appKey: '0f46bd73c00d1c04d3ed688d3af8fb7d',
};


final.fixer = {
    appKey: '62f6e72fe39a5bd6a213f3b763d5b5ad',
};

final.port = PORT || 3004;

module.exports = final;
