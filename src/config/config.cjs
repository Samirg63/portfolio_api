require('dotenv').config()
const path = require('path')
const fs = require('fs')

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './src/db/database.development.sqlite3'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    protocol:'postgres',
    logging:false,
    dialectOptions: {
      ssl: {
        require: true,
        ca:fs.readFileSync('./ca.pem').toString()
      }
    }
  }
};
