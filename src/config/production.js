const productionConfig = {
    isDev: false,
    // DB_URL: 'mongodb://airbuk:1234qwerasd@54.36.173.197:27017',
    DB_URL: 'mongodb+srv://airbuk:qwerty1234@cluster0-tzqlu.mongodb.net',
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
