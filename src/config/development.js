const developmentConfig = {
    isDev: true,
    DB_URL: 'mongodb+srv://test:test@123@clustertest.3bp4t.mongodb.net',
    DB_NAME: 'test?retryWrites=true&w=majority'
};

developmentConfig.DB_URI = `${developmentConfig.DB_URL}/${developmentConfig.DB_NAME}`;
developmentConfig.secret = 'qweqweqwe';

module.exports = developmentConfig;
