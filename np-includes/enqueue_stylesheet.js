module.exports = (name,url,dependancies) => {
    if(typeof global.__stylesheets == 'undefined') {
        global.__stylesheets = [];
    }

    global.__stylesheets.push({
        name,
        url,
        dependancies
    })
} 