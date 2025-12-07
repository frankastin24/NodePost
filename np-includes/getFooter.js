const getThemePath = require('./getThemePath');
module.exports = async () => {
    const ejxstring = fs.readFileSync(getThemePath + 'header.ejs', 'utf8');
    return await renderAsync(ejxstring,viewContext);;
}