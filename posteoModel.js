
const {DataTypes} = require('sequelize');
const {sequelize} = require('./database.js');

const Posteo = sequelize.define('posteos', {
  titulo: {
    type: DataTypes.STRING,
    
  },
  texto: {
    type: DataTypes.STRING,
   
  },
  imagen: {
    type: DataTypes.STRING,
   
  },
  }, {
  timestamps: false,
  tableName:'posteos',
});


module.exports = Posteo;
