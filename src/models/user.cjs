'use strict';

import Model from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    subtitle: {
      type:DataTypes.STRING,
      allowNull:false
    },
    image: {
      type:DataTypes.STRING,
      allowNull:false
    },
    secondImage: DataTypes.STRING,
    curriculum: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};