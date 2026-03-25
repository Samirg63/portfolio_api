'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class About extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  About.init({
    image: DataTypes.STRING,
    text: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'About',
  });
  return About;
};