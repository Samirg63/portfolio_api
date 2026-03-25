'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Projects.associate = (model)=>{
        Projects.belongsToMany(model.Tags,{
          through:model.ProjectTags,
          foreignKey:'ProjectId',
          otherKey:'TagId'
        })
      }
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