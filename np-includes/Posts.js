const Post = require('../models/Post.js');
class Posts {

    static async getPost(id) {
        return await Post.findByPk(id);
    }

    static async updatePost(data) {
        
        const post = await Post.findByPk(data.id);

        if (!post) {
            return false;
        }

        post.title = data.title || post.title;
        post.content = JSON.stringify(data.content) || post.content;
        post.post_type = data.post_type || post.post_type;
        post.slug = data.slug || post.slug;
        post.post_status = data.status || post.post_status;

        await post.save();

        return post;
    }
    
    static async createPost(data) {

        const post = {
            author : data.author || 0,
            title : data.title || 'Untitled',
            content : data.content || '',
            post_type : data.post_type || 'post',
            slug : data.slug || '',
            status : data.status || 'draft'
        }

        const newPost = Post.build(post)

        await newPost.save();

        return newPost;
    }

    static async deletePost(id) {
        const post = await Post.findByPk(id);

        if (!post) {
            throw new Error('Post not found');
        }

        await post.destroy();

        return true;
    }

}

module.exports = Posts;;