'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Skills.associate = (model)=>{
        Skills.belongsTo(model.SkillsGroup,{
          foreignKey:'groupId'
        })
      }
    }
  }
  Skills.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    icon: {
      type:DataTypes.STRING,
      allowNull:false
    },
    groupId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Skills',
  });

  
  return Skills;
};