const {DataTypes} = require('sequelize');

const Template = global.npdb.define('np_templates', {
  
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },

  name: DataTypes.STRING,
  content: DataTypes.TEXT,
  post_type : DataTypes.STRING,
});

module.exports = Template;

(async ()=> {
    await global.npdb.sync();
})()
