const { Sequelize } = require('sequelize');

const dbName= process.env.DB_NAME
const dbUsuario= process.env.DB_USUARIO
const dbPassword= process.env.DB_PASSWORD

const sequelize = new Sequelize(dbName, dbUsuario, dbPassword, {
  host: 'localhost',
  dialect: 'mysql',
  
});
 const DBTest = async () => {
  try {
    await sequelize.authenticate();
    console.log('se pudo conectar a la base de datos');
  } catch (error) {
    console.error('no hay coneccion con la base de datos:', error);
  }

 }


module.exports = {sequelize , DBTest}


