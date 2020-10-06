const developmentConfig = {
    isDev: true,
    DB_URL: 'mongodb+srv://test:test@123@clustertest.3bp4t.mongodb.net',
    DB_NAME: 'test?retryWrites=true&w=majority',
    TOKEN_SECRET: 'TOKEN_SECRET',
    TOKEN_OPTIONS: {
        expiresIn: '24h',
    },
    REFRESH_TOKEN_SECRET: 'REFRESH_TOKEN_SECRET',
    REFRESH_TOKEN_OPTIONS: {
        expiresIn: '7d',
    }
};

developmentConfig.DB_URI = `${developmentConfig.DB_URL}/${developmentConfig.DB_NAME}`;

module.exports = developmentConfig;
