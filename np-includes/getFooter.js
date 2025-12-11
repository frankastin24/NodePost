const getThemePath = require('./getThemePath');
const fs = require('fs');
let {renderAsync} = require('../fuse/ejsCompiler');
module.exports = async (footerName = false) => {
  let ejxstring;
    if(footerName) {
       ejxstring = fs.readFileSync(global.__app_path + getThemePath() + 'header-'+headerName+'.ejs', 'utf8');
    } else {
       ejxstring = fs.readFileSync(global.__app_path + getThemePath() + 'footer.ejs', 'utf8');
    }
    
    return await renderAsync(ejxstring,{});
}