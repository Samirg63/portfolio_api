'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const configFile = require('../config/config.cjs');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

const db = {};

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config);
}

// Carregar todos os models
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file !== basename &&
      file.endsWith('.js')
    );
  })
  .forEach(file => {
    const modelModule = require(path.join(__dirname, file));

    const model = modelModule.default(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
  });

// Executar associações
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
