'use strict';
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Abouts extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  Abouts.init({
    image: DataTypes.STRING,
    text: {
      type:DataTypes.TEXT,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Abouts',
  });
  return Abouts;
};