const {DataTypes} = require('sequelize');

const PostMetaField = global.npdb.define('np_options', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },
  cpt: DataTypes.INTEGER,
  title: DataTypes.STRING,
  type: DataTypes.STRING,
});

module.exports = PostMetaField;

(async ()=> {
    await global.npdb.sync();
})()