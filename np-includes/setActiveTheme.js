const {get_option} = require('./options');
module.exports = async () => {

    const activeTheme = await get_option('active_theme');
    if(activeTheme) {
        global.__active_theme = activeTheme;
    } else {
        global.__active_theme = 'blank';
    }

}