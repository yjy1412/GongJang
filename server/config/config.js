require('dotenv').config();

module.exports = {
  "development": {
    "username": DATABASE_USER,
    "password": DATABASE_PASSWORD,
    "database": DATABASE_NAME,
    "host": DATABASE_HOST,
    "port": DATABASE_PORT,
    "dialect": "mysql"
  },
  "test": {
    "username": DATABASE_USER,
    "password": DATABASE_PASSWORD,
    "database": DATABASE_NAME,
    "host": DATABASE_HOST,
    "port": DATABASE_PORT,
    "dialect": "mysql"
  },
  "production": {
    "username": DATABASE_USER,
    "password": DATABASE_PASSWORD,
    "database": DATABASE_NAME,
    "host": DATABASE_HOST,
    "port": DATABASE_PORT,
    "dialect": "mysql"
  }
}
