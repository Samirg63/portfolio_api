'use strict';
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Contacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contacts.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false
    },
    whatsapp: {
      type:DataTypes.STRING,
      allowNull:false
    },
    github: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    sectionTitle:{
      type:DataTypes.STRING,
      allowNull:false
    },
    sectionSubtitle: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Contacts',
  });
  return Contacts;
};