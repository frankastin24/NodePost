const getThemePath = require('./getThemePath');
module.exports = async (headerName = false) => {
  let ejxstring;
    if(headerName) {
       ejxstring = fs.readFileSync(getThemePath + 'header-'+headerName+'.ejs', 'utf8');
    } else {
       ejxstring = fs.readFileSync(getThemePath + 'header.ejs', 'utf8');
    }
    
    return await renderAsync(ejxstring,viewContext);;
}