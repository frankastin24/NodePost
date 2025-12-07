const Post = require('../models/Post');

module.exports = async (id) => {
    
    const posts = await Post.findAll({
        where : {
            id
        }
    })

    if(posts.length > 0) {
        return posts[0];
    } else {
        return false;
    }

   


}