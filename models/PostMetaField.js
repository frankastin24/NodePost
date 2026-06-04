const {DataTypes} = require('sequelize');

const PostMetaField = global.npdb.define('np_post_meta_field', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },
  cpt: DataTypes.INTEGER,
  title: DataTypes.STRING,
  type: DataTypes.STRING,
  isolateToPost : DataTypes.BOOLEAN,
  postToIsolate : DataTypes.INTEGER,
});

module.exports = PostMetaField;

(async ()=> {
    await global.npdb.sync();
})()