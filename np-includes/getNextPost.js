const Post = require('../models/Post');
const { Op } = require('sequelize');
module.exports = async (post) => {

    const postID = (typeof post == 'object' ? post.id : post);
    
    const nextPost = await Post.findOne({
        where: {
            id: {
               [Op.gt]: postID
            },
            post_type: post.post_type,
            post_status: 'published'
        },
        order: [['id', 'ASC']]
    })

    return nextPost; 
  
}