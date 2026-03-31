'use strict';
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
          
          Tags.belongsTo(models.TagsGroups,{
            foreignKey:'groupId'
          })

      
       Tags.belongsToMany(models.Projects, {
          through: models.ProjectsTags,
          foreignKey:'tagId',
          otherKey: 'projectId',
          onDelete: 'CASCADE'
        });
      
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