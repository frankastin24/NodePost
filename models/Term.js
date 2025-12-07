const {DataTypes} = require('sequelize');

const Term = global.npdb.define('np_taxonomy', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },
  taxonomyID: DataTypes.INTEGER,
  slug: DataTypes.STRING,
  title: DataTypes.STRING,
});

module.exports = Term;

(async ()=> {
    await global.npdb.sync();
})()