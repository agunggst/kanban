'use strict';
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.sequelize.Model {}

  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: {
          msg: 'Please Fill Your Email Address'
        }
      }
    },
    password: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate: (instance, option) => {
        return bcrypt.hash(instance.password, 10).then( result => {
          instance.password = result
        } )
        .catch( err => {
          console.log('Error Hashing Password')
        } )
      }
    },
    sequelize
  })

  User.associate = function(models) {
    User.hasMany( models.Task, { foreignKey: 'user_id' } )
  };
  return User;
};