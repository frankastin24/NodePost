module.exports = (action, callback) => {

    if(typeof global.__ajax == 'undefined') {
        global.__ajax = {};
    }

    global.__ajax[action] = callback;

}



