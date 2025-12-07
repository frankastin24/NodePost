const getThemePath = require("../np-includes/getThemePath");
const fs = require('fs');
const { get_option } = require("../np-includes/options");
const registerTaxonomy = require('../np-includes/registerTax');
class NPLoad {

    static registerCategories() {

        registerTaxonomy({
            slug : 'categories',
            title : 'Categories',
            cpts : ['all'],
            termName : 'Category'
        });

    }

    static init(request,context) {

        if(global.__env.INSTALL_COMPLETE == 'false') {
            context.res.redirect(`/${global.__env.ADMIN_URL}/install`);
        }

        const themePath = getThemePath();
        
        if(context.req.path == '') {
            /* Check for home template */

            const front_page = get_option('front_page_slug','');
            
            context.req.post = getPostBy('slug',front_page);

            if(fs.existsSync(themePath + 'page-' + front_page + '.ejs')) {
                return view(themePath + 'page-'+front_page, {post : context.req.post},context);
            }
            
            if(fs.existsSync(themePath + 'home.ejs')) {
                return view(themePath+'home', {post : context.req.post},context);
            }

            /* If no template display index.ejs */

            return view(themePath+'index', {post : context.req.post},context);

        }

    }
}

module.exports = NPLoad;