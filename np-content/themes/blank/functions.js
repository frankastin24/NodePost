const enqueueStyleSheet = require('../../../np-includes/enqueue_stylesheet');

add_action('enqueue_scripts', () => {
   enqueueStyleSheet('main styles', getThemeURI()+ '/scss/index.scss',[]);
})



