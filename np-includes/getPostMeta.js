const PostMeta = require('../models/PostMeta');

module.exports = async (post,key) => {
    const postID = (typeof post == 'object' ? post.id : post);
    
    const foundPostMetas = await PostMeta.findAll({
        where: {
            postID,
            key,
        }
    })

    if(foundPostMetas.length > 0) {
        return foundPostMetas[0].value;
    } else {
        return false;
    }
    
}