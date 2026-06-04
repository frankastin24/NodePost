const Post = require('../models/Post');
const { Op } = require('sequelize');

class NPQuery {
    constructor(query) {

        this.where = {};

        this.order = query.order || [['id', 'DESC']];

        this.limit = query.limit || 10;

        this.offset = query.offset || 0;

        this.where.post_type = query.post_type;
        
        this.where.post_status = query.post_status || 'published';
        
    }

    async getPosts() {
        const posts = await Post.findAll({
                where :this.where,
                order : this.order,
                limit :this.limit,
                offset: this.offset,
        });
        return posts;
    }

    
}

module.exports = NPQuery;