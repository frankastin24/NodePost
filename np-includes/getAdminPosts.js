const Post = require('../models/Post');
const { Op } = require('sequelize');    

module.exports = async (cpt,limit,offset) => {
    const posts = await Post.findAll({
        where: {
            post_type: cpt,
            post_status: {
                [Op.ne]: 'new'
            },

        },
        order: [
            ['id', 'DESC']
        ],
        limit,
        offset,
    })


    return posts;

}