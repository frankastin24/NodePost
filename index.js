/* 

NodePost V0.5

NodePost is a Web Creation framework, 
featuring a CMS, content editor, page builder, 
2D & 3D design and animation tools, and more.

Copyright 2026 Fuseolution 
http://fuseolution.com

Author: Frank Astin 
https://frankastin.com

*/
const load = async () => {

    //Load environmentals

    global.__app_path = __dirname;
    require('./fuse/enviromentals');

    //Initialize Database

    const { initializeDB } = require('./fuse/db');

    await initializeDB();

    //Set Active Theme

    const setActiveTheme  = require('./np-includes/setActiveTheme');
    await setActiveTheme();

    //Load Routes

    require('./routes')

    //Start Server

    require('./fuse/server');

}

load();








