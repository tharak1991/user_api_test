const productionConfig = {
    isDev: false,
    DB_URL: 'mongodb+srv://test:test@123@clustertest.3bp4t.mongodb.net',
    DB_NAME: 'test?retryWrites=true&w=majority'
};

productionConfig.DB_URI = `${productionConfig.DB_URL}/${productionConfig.DB_NAME}`;
productionConfig.secret = 'qweqweqwe';

module.exports = productionConfig;
