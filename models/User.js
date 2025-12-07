const {DataTypes} = require('sequelize');
const User = global.npdb.define('np_users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },
  email: DataTypes.STRING,
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  role: DataTypes.STRING,

});

module.exports = User;

(async ()=> {
    await global.npdb.sync();
})()
    