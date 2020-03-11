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
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {sequelize})

  Task.associate = function(models) {
    Task.belongsTo( models.User, { foreignKey: 'user_id' } )
  };
  return Task;
};