const getThemePath = require("../np-includes/getThemePath");
const fs = require('fs');
const { get_option } = require("../np-includes/options");
const registerTaxonomy = require('../np-includes/registerTax');
const view = require('../fuse/view')
const doAction = require('../np-includes/doAction');
const CustomPostType = require('../models/CustomPostType');
const Post = require('../models/Post');
class NPLoad {

    static registerCategories() {

        registerTaxonomy({
            slug: 'categories',
            title: 'Categories',
            cpts: ['all'],
            termName: 'Category'
        });

    }

    static async init(request, context) {

        if (global.__env.INSTALL_COMPLETE == 'false') {
            context.res.redirect(`/${global.__env.ADMIN_URL}/install`);
        }

        const themePath = getThemePath();

        require(global.__app_path + themePath + 'functions');

        const siteTitle = await get_option('site_title');
        const siteTagLine = await get_option('site_tagline');

        context.page_title = `${siteTitle} ${siteTagLine}`;

        doAction('enqueue_scripts');

        if (context.req.path == '/') {
            /* Check for home template */


            // if(fs.existsSync(themePath + 'page-' + front_page + '.ejs')) {
            //     return view(themePath + 'page-'+front_page, {post : context.req.post},context);
            // }

            if (fs.existsSync(global.__app_path + themePath + 'home.ejs')) {
                return view(themePath + 'home', { post: context.req.post }, context);
            }

            /* If no template display index.ejs */

            return view(themePath + 'index', { post: context.req.post }, context);

        } else {

            //Check if post


            // Check if cpt

            const foundCPTs = await CustomPostType.findAll({
                where: {
                    slug: request.urlParam1
                }
            })

            if (foundCPTs.length > 0) {

                if (request.urlParam2) {

                    const posts = await Post.findAll({
                        where:
                        {
                            slug: request.urlParam2
                        }
                    })

                    if(posts.length > 0) {

                        const post = posts[0];

                        return view(themePath + 'single', { post }, context);
                    
                    }

                } else {

                    const posts = await Post.findAll({

                        where: {
                            post_type: request.urlParam1,
                            post_status: 'published'
                        },
                        order: [
                            // Will escape title and validate DESC against a list of valid direction parameters
                            ['id', 'DESC']]

                    });

                    return view(themePath + 'archive', { posts }, context);

                }




            }
        }


    }
}

module.exports = NPLoad;