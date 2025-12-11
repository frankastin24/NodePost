const enqueueStyleSheet = require('../../../np-includes/enqueue_stylesheet');
const add_action = require('../../../np-includes/addAction');
const getThemePath = require('../../../np-includes/getThemePath');

add_action('enqueue_scripts', () => {
   enqueueStyleSheet('main styles', getThemePath()+ 'scss/index.css',[]);
})



