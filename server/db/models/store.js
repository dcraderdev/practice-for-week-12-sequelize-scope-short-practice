'use strict';
const { Op } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Store.hasMany(models.Instrument, { foreignKey: 'storeId' });
    }
  }
  Store.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Store',

    defaultScope:{
      attributes:{
       exclude: [`createdAt`, `updatedAt`]
       }
     },

    scopes:{
      isKeyboard(storeId){
        const {Instrument} = require('../models');
        return {
          where:{
            storeId,
            type: 'keyboard'
            }
     
        ,
        include: {model:Instrument}
        }
      }

    }



  });
  return Store;
};