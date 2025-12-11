const  Post = require('../models/Post');

module.exports = async (post) => {
     console.log(post);
    const newPost = Post.build({
            author: post.author,
             title: post.title,
             content: post.content,
             post_type : post.post_type,
             slug : post.slug,
             post_status : post.status
    })

    await newPost.save();
    
    return newPost;
}