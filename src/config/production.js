const productionConfig = {
    isDev: false,
    DB_URL: 'mongodb+srv://test:test@123@clustertest.3bp4t.mongodb.net',
    DB_NAME: 'test?retryWrites=true&w=majority',
    TOKEN_SECRET: 'TOKEN_SECRET',
    TOKEN_OPTIONS: {
        expiresIn: '24h',
    },
    REFRESH_TOKEN_SECRET: 'REFRESH_TOKEN_SECRET',
    REFRESH_TOKEN_OPTIONS: {
        expiresIn: '7d',
    },
    image_url: "http://api.airbuk.com/image/",
    mail: {
        username: "no-reply@airbuk.com",
        password: "Qwerty171",
    }
};

productionConfig.DB_URI = `${productionConfig.DB_URL}/${productionConfig.DB_NAME}`;

module.exports = productionConfig;
