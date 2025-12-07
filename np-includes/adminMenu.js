const add_action = require('./addAction')

module.exports =  () => {

        add_action('admin_menu', async (context) => {
            
            global.admin_menu = [];

            global.admin_menu.push({
                pageName : 'Museo AI',
                dashIcon : 'museo-white',
                pageURL : '/np-admin/museo'
            })
            
            global.__cpts.forEach((CPT) => {
                global.admin_menu.push({
                    pageName : CPT.title,
                    dashIcon : 'posts',
                    slug : CPT.slug,
                    subMenu : [
                        {
                            pageName: 'View All',

                            pageURL : 'view-all/'+CPT.slug
                        
                        },
                        {
                            
                            pageName: 'Create New',
                            
                            pageURL : 'create-post/'+CPT.slug
                        
                        },
                        {
                            
                            pageName: 'Templates',
                            
                            pageURL : 'templates/'+CPT.slug
                        
                        },
                    ]
                })
            })

            global.admin_menu.push({
                pageName : 'Pages',
                dashIcon : 'pages',
                subMenu: [
                    {
                            pageName: 'View All',
                            pageURL : 'pages/view-all'
                    },
                    {
                            pageName: 'Add New',
                            pageURL : 'pages/add'
                    },
                ] 
            })

            global.admin_menu.push({
                pageName : 'CPT',
                dashIcon : 'posts',
                subMenu: [
                    {
                            pageName: 'View All',
                            pageURL : 'cpt/view-all'
                    },
                    {
                            pageName: 'Add New',
                            pageURL : 'cpt/add'
                    },
                ] 
            })
 
            global.admin_menu.push({
                pageName : 'Themes',
                dashIcon : 'theme',
                subMenu: [
                    {
                            pageName: 'View All',
                            pageURL : 'themes/view-all'
                    },
                    {
                            pageName: 'Add New',
                            pageURL : 'themes/add'
                    },
                ] 
            })

            global.admin_menu.push({
                pageName : 'Plugins',
                dashIcon : 'plugins',
                subMenu: [
                    {
                            pageName: 'View All',
                            pageURL : 'plugins/view-all'
                    },
                    {
                            pageName: 'Add New',
                            pageURL : 'plugins/add'
                    },
                ] 
            })

            global.admin_menu.push({
                pageName : 'Settings',
                dashIcon : 'settings',
                subMenu: [
                    {
                            pageName: 'General',
                            pageURL : 'settings/general'
                    },
                    {
                            pageName: 'SMPT',
                            pageURL : 'settings/smpt'
                    },
                ] 
            })
        }, 0);
    }