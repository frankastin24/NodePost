const getThemePath = require("../np-includes/getThemePath");
const fs = require('fs');
const { get_option } = require("../np-includes/options");
const view = require('../fuse/view')
const doAction = require('../np-includes/doAction');
const CustomPostType = require('../models/CustomPostType');
const Post = require('../models/Post');
class NPLoad {

    static async init(request, context) {

        if (global.__env.INSTALL_COMPLETE == 'false') {
            context.res.redirect(`/${global.__env.ADMIN_URL}/install`);
        }

        const themePath = getThemePath();

        require(global.__app_path + themePath + 'functions');

        const siteTitle = await get_option('site_title');
        const siteTagLine = await get_option('site_tag_line');

        context.page_title = `${siteTitle} - ${siteTagLine}`;

        doAction('enqueue_scripts');

        if (context.req.path == '/') {
            /* Check for home template */
            const front_page = await get_option('front_page');

            // Check if a static front page is set

            if (front_page) {
                if(fs.existsSync(themePath + 'page-' + front_page + '.ejs')) {
                 return view(themePath + 'page-'+front_page, {post : context.req.post},context);
                }
            }

            if (fs.existsSync(global.__app_path + themePath + 'home.ejs')) {
                return view(themePath + 'home', { post: context.req.post }, context);
            }

            /* If no template display index.ejs */

            return view(themePath + 'index', { post: context.req.post }, context);

        } else {

            //Check if page 

            const post = await Post.findOne({
                where : {
                    post_type : 'page',
                    slug : request.urlParam1,
                    post_status : 'published'
                }
            })

            if(post) {
                context.page_title = `${siteTitle} - ${post.title}`;
                return view(themePath + 'page', { post }, context);
            }

            // Check if Custom Post Type Archive or Single Post

            const foundCPT = await CustomPostType.findOne({
                where: {
                    slug: request.urlParam1
                }
            })

            if (foundCPT) {

                if (request.urlParam2) {

                    const post = await Post.findOne({
                        where:
                        {
                            slug: request.urlParam2
                        }
                    })

                    if(post) {

                        context.page_title = `${siteTitle} - ${post.title}`;

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

                    const cpt = await CustomPostType.findOne({
                        where : {
                            slug : request.urlParam1
                        }
                    })
                    
                    context.page_title = `${siteTitle} - ${cpt.title}`;

                    if(posts) {
                         return view(themePath + 'archive', { posts }, context);
                    }

                }

            }
        }
        
        return view(themePath + '404', { }, context);

    }
}

module.exports = NPLoad;