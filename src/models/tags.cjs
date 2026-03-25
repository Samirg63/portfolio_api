'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
          Tags.associate = (model)=>{
          Tags.belongsTo(model.TagsGroup,{
            foreignKey:'groupId'
          })
      }

      Tags.associate = (model)=>{
        Tags.belongsToMany(model.Tags,{
          through:model.ProjectTags,
          foreignKey:'TagsId',
          otherKey:'ProjectId'
        })
      }
    }
  }
  Tags.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    groupId: {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Tags',
  });

  
  return Tags;
};