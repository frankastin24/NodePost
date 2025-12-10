const {DataTypes} = require('sequelize');

const CustomPostType = global.npdb.define('np_custom_post_types', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },
  title: DataTypes.STRING,
  slug: DataTypes.STRING,
  menu_name: DataTypes.STRING,
  content_editor: DataTypes.BOOLEAN,
  page_builder: DataTypes.BOOLEAN,
  use_rest: DataTypes.BOOLEAN,
  top_level: DataTypes.BOOLEAN,
  singular:DataTypes.STRING ,
  plural:DataTypes.STRING 
});

module.exports = CustomPostType;

(async ()=> {
    await global.npdb.sync();
})()