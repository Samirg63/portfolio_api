'use strict';
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
        Projects.belongsToMany(models.Tags,{
          through:models.ProjectsTags,
          foreignKey:'projectId',
          otherKey:'tagId',
          onDelete:'CASCADE'
        })
    }
  }
  Projects.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    desc: {
      type:DataTypes.STRING,
      allowNull:false
    },
    images:{
      type:DataTypes.STRING,
      allowNull:false
    },
    coverImage: {
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    projectLink: DataTypes.STRING,
    githubLink: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Projects',
  });
  return Projects;
};