const Post = require('../models/Post')
module.exports = async (post) => {

    const posts = await Post.findAll({
        where: {
            id: post.id
        }
    })

    if (posts.length > 0) {
    
        const foundPost = posts[0];
        
        if(post.title) {
           foundPost.title = post.title;
        }
        if(post.content) {
            foundPost.content = JSON.stringify(post.content);
        }
         
        if(post.slug) {
            foundPost.slug = post.slug;
           
        }
        
        if(post.status) {
           foundPost.post_status = post.status;
        }
        
        await foundPost.save();
    
        return true;
    
    } else {

        return false;
    
    }



}