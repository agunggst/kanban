'use strict';
module.exports = (sequelize, DataTypes) => {
  class Task extends sequelize.Sequelize.Model {}

  Task.init({
    title: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: {
          msg: 'Please Fill Your Task Title'
        }
      }
    },
    description: DataTypes.STRING,
    category: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: {
          msg: 'Please Select Task Category'
        }
      }
    },
    user_id: DataTypes.INTEGER
  }, {sequelize})

  Task.associate = function(models) {
    Task.belongsTo( models.User, { foreignKey: 'user_id' } )
  };
  return Task;
};