'use strict';
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Skills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Skills.belongsTo(models.SkillsGroups,{
          foreignKey:'groupId'
        })
      
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
    order: {type:DataTypes.INTEGER,defaultValue:1}
  }, {
    sequelize,
    modelName: 'Skills',
  });

  
  return Skills;
};