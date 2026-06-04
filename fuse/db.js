const { Sequelize } = require('sequelize');
const doAction = require('../np-includes/doAction');


const initializeDB = async () => {
  
  if(global.__env.FORCE_MYSQL == 'true' ||  global.__env.MODE == 'production') {
  
    sequelize = new Sequelize({
     dialect: 'mysql',
     host: global.__env.DB_HOSTNAME,
     username: global.__env.DB_USERNAME,
     password: global.__env.DB_PASSWORD,
    });

  } else {

    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: global.__app_path +'/postnode.sqlite' ,// <-- your file path here
      logging: false
    });

  }
   
  await sequelize.authenticate()

  global.npdb = sequelize;

}

const testConnection = async () => {

  const sequelize = new Sequelize({
    dialect: 'mysql',
    host: global.__env.DB_HOSTNAME,
    username: global.__env.DB_USERNAME,
    password: global.__env.DB_PASSWORD,
  });

  try {
    await sequelize.authenticate();
    return 'Success';
  } catch (error) {
    return 'Unable to connect to the database:'; 
  } finally {
    await sequelize.close();
  }
}

module.exports = {initializeDB , testConnection};

