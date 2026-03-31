'use strict';
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class ProjectsTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       
    }
  }
  ProjectsTags.init({
    projectId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    tagId:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'ProjectsTags',
  });
  return ProjectsTags;
};