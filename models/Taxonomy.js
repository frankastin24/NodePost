const {DataTypes} = require('sequelize');

const Taxonomy = global.npdb.define('np_taxonomy', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },
  title: DataTypes.STRING,
  slug: DataTypes.STRING,
  cpts: DataTypes.STRING,
  termName: DataTypes.STRING,
});

module.exports = Taxonomy;

(async ()=> {
    await global.npdb.sync();
})()