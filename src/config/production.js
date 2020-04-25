const productionConfig = {
  isDev: false,
  // DB_URL: 'mongodb://airbuk:1234qwerasd@54.36.173.197:27017',
  DB_URL: 'mongodb://airbuk:qwerty1234@ds031319.mlab.com:31319',
  DB_NAME: 'airbuk',
  TOKEN_SECRET: 'TOKEN_SECRET',
  TOKEN_OPTIONS: {
    expiresIn: '24h',
  },
  REFRESH_TOKEN_SECRET: 'REFRESH_TOKEN_SECRET',
  REFRESH_TOKEN_OPTIONS: {
    expiresIn: '7d',
  },
  image_url: "http://api.airbuk.com/image/"
};

productionConfig.DB_URI = `${productionConfig.DB_URL}/${productionConfig.DB_NAME}`;

module.exports = productionConfig;
