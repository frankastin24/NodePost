const PostMeta = require('../models/PostMeta');

module.exports = async (post, key, value) => {

    const postID = (typeof post == 'object' ? post.id : post);
    console.log(typeof post);

    const foundPostMetas = await PostMeta.findAll({
        where: {
            postID,
            key,
        }
    })

    if (foundPostMetas.length > 0) {
        foundPostMetas[0].value = value;
        foundPostMetas[0].save();
    } else {
        const newPostMeta = PostMeta.build({
            postID,
            key,
            value
        })

       await newPostMeta.save();

    }

    return true;



}