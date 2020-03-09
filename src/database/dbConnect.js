const mongoose = require('mongoose');

const config = require('../config');

mongoose.Promise = Promise;
const db = mongoose.connection;

db.on('error', (error) => {
  /* eslint-disable no-console */
  console.log('Mongoose default connection error: ' + error);
  /* eslint-disable no-console */
});

db.on('connected', () => {
  console.log('Mongoose default connection established');
});

db.on('reconnected', () => {
  /* eslint-disable no-console */
  console.log('Mongoose default connection reestablished');
  /* eslint-disable no-console */
});

db.on('disconnected', () => {
  /* eslint-disable no-console */
  console.log('Mongoose default connection disconnected');
  /* eslint-disable no-console */
});

db.on('close', () => {
  /* eslint-disable no-console */
  console.log('Mongoose default connection closed');
  /* eslint-disable no-console */
});

process.on('SIGINT', function() {
  db.close(() => {
    /* eslint-disable no-console */
    console.log('Mongoose default connection disconnected through app termination');
    /* eslint-disable no-console */

    process.exit(0);
  });
});

const dbConnect = async () => {
  try {
    await mongoose.connect(config.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = dbConnect;
