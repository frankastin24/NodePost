const Post = require('../models/Post');

module.exports = async (type,value) => {
    
    if(type == 'slug') {
         const foundPosts = await Post.findAll({
            where : {
                slug : value
            }
         })

         if(foundPosts.length > 0) {
            return foundPosts[0]
         } else {
            return false;
         }
    }

    if(type == 'title') {
         const foundPosts = await Post.findAll({
            where : {
                title : value
            }
         })

         if(foundPosts.length > 0) {
            return foundPosts[0]
         } else {
            return false;
         }
    }


}