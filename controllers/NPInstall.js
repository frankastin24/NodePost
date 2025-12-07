
const addNoPrivAjax = require('../np-includes/addNoPrivAjax');
const updateEnviromental = require('../fuse/enviromentals');
const admin_views_path = '/np-content/admin/';
const view = require('../fuse/view');
const createAdmin = require('../np-includes/createAdmin');
const loginUser = require('../np-includes/loginUser');

class NPInstall {

    static index(request,context) {
        return view(admin_views_path + 'install', {}, context);
    }

    static registerAJAX(request,context) {

        const { update_option,get_option } = require('../np-includes/options')


        /* Current Language */
        
        addNoPrivAjax('get_current_lang', (context) => {
            if(global.__env.INSTALL_COMPLETE == 'true') {
                return context.send('Install Complete');
            }
            console.log(global.__env.LANGUAGE);
            context.res.send(global.__env.LANGUAGE);
        })

        addNoPrivAjax('set_current_lang', (context,request) => {
            if(global.__env.INSTALL_COMPLETE == 'true') {
                return context.send('Install Complete');
            }
            updateEnviromental('LANGUAGE' ,request.lang);
            context.res.send('success')
        })

        /* Current Install Step */
        
        addNoPrivAjax('get_install_step', (context) => {
            if(global.__env.INSTALL_COMPLETE == 'true') {
                return context.send('Install Complete');
            }
            context.res.send(global.__env.INSTALL_STEP);
        })
        
        addNoPrivAjax('set_current_step', (context,request) => {
            if(global.__env.INSTALL_COMPLETE == 'true') {
                return context.send('Install Complete');
            }
            updateEnviromental('INSTALL_STEP', request.step);
            context.res.send('true');
        })

        /* Database */

        addNoPrivAjax('get_db', (context,request) => {
            context.res.send(global.__env.DATABASE);
        })


        addNoPrivAjax('set_db', (context,request) => {
            if(global.__env.INSTALL_COMPLETE == 'true') {
                return context.send('Install Complete');
            }
            updateEnviromental('DATABASE', request.db);
            context.res.send('true');
        })

        addNoPrivAjax('set_mysql_creds', (context,request) => {
        
            if(global.__env.INSTALL_COMPLETE == 'true') {
                return context.send('Install Complete');
            }
        
            updateEnviromental('DB_HOST', request.host);
            updateEnviromental('DB_USER', request.username);
            updateEnviromental('DB_NAME', request.name);
            updateEnviromental('DB_PASSWORD', request.password);
        
            context.res.send('true');
        
        })

        /* Site Details */

        addNoPrivAjax('set_site_details', (context,request) => {
        
            if(global.__env.INSTALL_COMPLETE == 'true') {
                return context.send('Install Complete');
            }
            
            update_option('site_title', request.site_title);
            update_option('site_tag_line', request.site_tag_line);
        
            context.res.send('true');
        
        })

         addNoPrivAjax('get_site_details', async (context,request) => {
        
            if(global.__env.INSTALL_COMPLETE == 'true') {
                return context.send('Install Complete');
            }
            const returnObj = {};

            returnObj.site_title = await get_option('site_title');
            returnObj.site_tag_line = await get_option('site_tag_line');
            
            context.res.send(JSON.stringify(returnObj));
        
        })

        

        /* Admin User */

        addNoPrivAjax('check_admin_created', async (context,request) => {
            
            const User = require('../models/User');

            const Users = await User.findAll();
            console.log(Users.length);

            if(Users.length > 0) {
                context.res.send('true');
            } else {
                context.res.send('false');
            }

            

        })

        addNoPrivAjax('create_admin', async (context,request) => {
            

            const user = {
                username : request.username,
                password : request.password
            }

            const newUser = await createAdmin(user);

            context.req.session.userID = newUser.id;

        })

        /* Ignite */

        addNoPrivAjax('start_with_blank', async (context) => {

            await update_option('active_theme', 'blank');
            
            updateEnviromental('INSTALL_COMPLETE',true);
            
            context.res.send('success');
            

        })

        addNoPrivAjax('start_with_ignition', async (context) => {

            await update_option('active_theme', 'ignition');
            
            updateEnviromental('INSTALL_COMPLETE',true);
            
            context.res.send('success');
            

        })

       

    }
}

module.exports = NPInstall;