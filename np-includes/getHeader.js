const getThemePath = require('./getThemePath');
const fs = require('fs');
let {renderAsync} = require('../fuse/ejsCompiler');

module.exports = async (headerName = false,viewContext) => {
  let ejxstring;
    if(headerName) {
       ejxstring = fs.readFileSync(global.__app_path + getThemePath() + 'header-'+headerName+'.ejs', 'utf8');
    } else {
       ejxstring = fs.readFileSync(global.__app_path + getThemePath() + 'header.ejs', 'utf8');
    }
    const template = await renderAsync(ejxstring,viewContext)
    return template;
}