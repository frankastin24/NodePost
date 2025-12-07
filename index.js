/* 

NodePost V0.5

NodePost is a Web Creation framework, 
featuring a CMS, page builder, 
2D & 3D design tools

Copyright 2025 Fuseolution 
http://fuseolution.com

Author: Frank Astin 
https://frankastin.com

*/

const scanAndRequire = require('./fuse/scanAndRequire');
const add_action = require('./np-includes/addAction');
const do_action = require('./np-includes/doAction');
const enqueue_admin_stylesheet = require('./np-includes/enqueue_admin_stylesheet');
const enqueue_admin_script = require('./np-includes/enqueue_admin_script');


//Load environmentals

global.__app_path = __dirname;

require('./fuse/enviromentals');
require('./fuse/db')

//Load models

add_action('db_initalized', () => {
 
   scanAndRequire(global.__app_path+'/models');
   
   do_action('enqueue_scripts');
   
   require('./routes')
   
   require('./fuse/server');

})

//Enqueue admin scripts 
add_action('enqueue_scripts', () => {
   enqueue_admin_stylesheet('Cormorant','https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&display=swap',[]);
    enqueue_admin_stylesheet('Roboto','https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap',[]);
   
   enqueue_admin_stylesheet('admin-styles','/np-content/admin/scss/index.css',[]);
   enqueue_admin_script('jquery','https://code.jquery.com/jquery-3.7.1.min.js',[],false);
   enqueue_admin_script('admin-script','/np-content/admin/js/script.js',['jquery'],true);
   enqueue_admin_script('basic-editor','/np-content/admin/vue/basic_editor/dist/dist.js',['jquery'],true);
})


//Load server



