const admin_views_path = '/np-content/admin/';
const view = require('../fuse/view');
const updateEnvVariable = require('../fuse/enviromentals');
const crypto = require('crypto')
const createPost = require('../np-includes/createPost');
const getPost = require('../np-includes/getPost');
const updatePost = require('../np-includes/updatePost');
const Post = require('../models/Post')
const { addAjax } = require('../np-includes/addAjax');
const adminMenu = require('../np-includes/adminMenu');
const loginUser = require('../np-includes/loginUser');
const addNoPrivAjax = require('../np-includes/addNoPrivAjax');
const fs = require('fs')
const { Op } = require('sequelize');
const CustomPostType = require('../models/CustomPostType');
class NPAdmin {

    static noPrivAjax(request, context) {
        console.log(context.req.body)
        if (global.__noPrivAjax && global.__noPrivAjax[request.action]) {

            global.__noPrivAjax[request.action](context, request);

        } else {

            context.res.send('Action not found!');

        }
    }

    static registerAJAX() {
        addAjax('get_post', async (context, request) => {
            const post = await getPost(request.id);

            context.res.send(JSON.stringify(post));
        })

        addAjax('save_post', async (context, request) => {
            const post = JSON.parse(request.post);

            await updatePost(post);

            context.res.send('success');
        })

        addAjax('get_dir_contents', async (context, request) => {
            const fs = require('fs');

            const path = global.__app_path + request.filePath;

            const entries = fs.readdirSync(path, { withFileTypes: true });

            const folders = [];
            const files = [];

            entries.forEach(entry => {

                if (entry.isDirectory()) {
                    folders.push(entry.name);
                } else if (entry.isFile()) {
                    files.push(entry.name);
                }

            });

            context.res.send(JSON.stringify({ files, folders }));
        })

        addAjax('upload_file', (context, request) => {
            const req = context.req;
            const res = context.res;
           

            const Busboy = require('busboy');
            const fs = require('fs');
            const path = require('path');

            const busboy = Busboy({ headers: req.headers });
            let filename = '';
            let folderPath = '';
            let saveTo = '';
            let fileSaved = false;

            busboy.on('field', (fieldname, val) => {
                if (fieldname === 'filename') filename = val;
                if (fieldname === 'path') folderPath = val;
            });

            busboy.on('file', (fieldname, file, fileInfo) => {
                // If client sent filename as POST variable, use that; otherwise use fileInfo.filename

                filename = filename.replaceAll(' ', '-');

                let actualFilename = filename || fileInfo.filename || `img_${Date.now()}.jpg`;



                const uploadDir = global.__app_path + folderPath;

                if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

                saveTo = path.join(uploadDir, actualFilename);

                const writeStream = fs.createWriteStream(saveTo);
                file.pipe(writeStream);
                file.on('end', () => { fileSaved = true; });
            });

            busboy.on('finish', () => {
                if (fileSaved) {
                    res.send(JSON.stringify({
                        success: true,
                        filePath: folderPath + (filename || ''),

                    }));
                } else {
                    res.status(500).send(JSON.stringify({
                        success: false,
                        message: 'File not written'
                    }));
                }
            });

            req.pipe(busboy);
        })

        addAjax('change_file_name', (context,request) => {
            const fs = require('fs');
            const oldPath = global.__app_path + request.oldPath;
            const newPath = global.__app_path + request.newPath;

            try {
                fs.renameSync(oldPath, newPath);
                context.res.send(`Renamed '${oldPath}' to '${newPath}'`);
            } catch (err) {
                context.res.send(`Error renaming '${oldPath}' to '${newPath}':` + err.message);
            }
        })

        addAjax('get_cpts' ,  async (context) => {
            
            const cpts = await CustomPostType.findAll();

            context.res.send(JSON.stringify(cpts))

        })
    }

    static async login(request, context) {
        if (global.__env.INSTALL_COMPLETE == 'false') {
            return context.res.redirect(`/${global.__env.ADMIN_URL}/install`);
        }
        if (request.username) {

            const loginStatus = await loginUser(context, request.username, request.password);

            if (loginStatus.error) {
                return view(admin_views_path + 'login', { message: loginStatus.message }, context)
            }
            context.res.redirect('/np-admin')
        } else {
            return view(admin_views_path + 'login', { message: '' }, context)
        }

    }

    static async index(request, context) {

        if (global.__env.INSTALL_COMPLETE == 'false') {
            return context.res.redirect(`/${global.__env.ADMIN_URL}/install`);
        }

        if (!context.req.session.userID || typeof context.req.session.userID == 'undefined') {
            return context.res.redirect(`/login`);
        }

        NPAdmin.registerAJAX()

        if (context.req.path.includes('np-ajax')) {

            if (typeof global.__ajax[request.action] !== 'undefined') {
                global.__ajax[request.action](context, request);
            } else {
                context.res.send('AJAX Action not found!');
            }

            return;
        }

        const do_action = require('../np-includes/doAction')

        adminMenu();

        const CustomPostType = require('../models/CustomPostType')

        global.__cpts = await CustomPostType.findAll();

        do_action('admin_menu');

        let offset, numPages, displayCPTs;

        if (request.param1 == 'create-post') {

            const cpt = global.__cpts.find((obj) => {
                return obj.slug == request.param2;
            })

            return view(admin_views_path + '/post-create', { basic_editor: true, cpt: cpt }, context);

        }

        if (request.param1 == 'cpt') {

            
            return view(admin_views_path + '/cpt', {}, context);
            
        }



        if (request.param1 == 'edit') {

            const currentPost = getPost(request.param2);

            global.post = currentPost;

            return view(admin_views_path + 'edit', { post: currentPost }, context);
        }

        if (request.param1 == 'view-all') {

            const posts = await Post.findAll({
                post_type: request.param2,
                post_staus : {
                    [Op.ne] : 'new'
                }
            })
            

            return view(admin_views_path + 'post-list', { posts }, context);

        }

        if (request.param1 == 'settings') {

            const currentCPT = get_cpt(request.param2);

            global.settingsPage = currentCPT;

            return view(admin_views_path + 'post', {}, context);

        }

        await view(admin_views_path + 'home', {}, context);
    }




    static async addCPT(request, context) {
        const CustomPostType = require('../models/CustomPostType');

        const foundTitles = await CustomPostType.findAll({
            where: {
                title: request.title
            }
        })
        console.log(foundTitles);

        if (foundTitles.length > 0) {
            return context.res.send('Title already used!');
        }

        const foundSlugs = await CustomPostType.findAll({
            where: {
                slug: request.slug
            }
        })

        if (foundSlugs.length > 0) {
            return context.res.send('Slug already used!');
        }

        const newCPT = CustomPostType.build({
            title: request.title,
            slug: request.slug,
            menu_name: request.menu_name,
            basic_editor: request.basic_editor,
            page_builder: request.page_builder,
            use_rest: request.use_rest,
            top_level: request.top_level
        })

        await newCPT.save();

        context.res.send('success');
    }

    static async updateCPT(request, context) {

        const CustomPostType = require('../models/CustomPostType');

        const cpts = await CustomPostType.findAll({
            where: {
                id: parseInt(request.id)
            }
        })


        const cpt = cpts[0];
        cpt.title = request.title;
        cpt.slug = request.slug;
        cpt.use_rest = request.use_rest;
        cpt.top_level = request.top_level;
        cpt.basic_editor = request.basic_editor;
        cpt.page_builder = request.page_builder;
        cpt.save();

        context.res.send('success');
    }

    static async deleteCPT(request, context) {

        const CustomPostType = require('../models/CustomPostType');

        await CustomPostType.destroy({
            where: {
                id: parseInt(request.id)
            }
        })

        context.res.send('success');
    }

    static uploadFile(request, context) {


    }

    static getDirContents(request, context) {


    }

    static createDir(request, context) {
        const fs = require('fs');

        const path = global.__app_path + request.folderPath;

        try {

            fs.mkdirSync(path, { recursive: true });
            context.res.send(`Directory created at: ${path}`);

        } catch (err) {

            context.res.send(`Error creating directory at ${path}:`, err.message);


        }
    }

    static renameFileFolder(request, context) {
       
    }



    static async ajax(request, context) {

        addAjax('create_post', async (context, request) => {

            const newPost = await createPost({
                title: '',
                slug: '',
                author: 0,
                content: '',
                post_type: request.post_type,
                slug: '',
                post_status: 'new'
            })

            context.res.send(newPost.id);

        })

        addAjax('add_cpt', async (context, request) => {
            NPAdmin.addCPT(request, context);
        })

    }


}

module.exports = NPAdmin;
