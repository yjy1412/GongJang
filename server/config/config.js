const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  "development": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": process.env.DATABASE_HOST,
    "port": process.env.DATABASE_PORT,
    "timezone": "+09:00",
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": process.env.DATABASE_HOST,
    "port": process.env.DATABASE_PORT,
    "timezone": "+09:00",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.PRODUCT_DATABASE_USER,
    "password": process.env.PRODUCT_DATABASE_PASSWORD,
    "database": process.env.PRODUCT_DATABASE_NAME,
    "host": process.env.PRODUCT_DATABASE_HOST,
    "port": process.env.PRODUCT_DATABASE_PORT,
    "timezone": "+09:00",
    "dialect": "mysql"
  }
}