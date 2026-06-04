const getPrevPost = require('./getPrevPost');
module.exports = async (post) => {
    
    const prevPost = await getPrevPost(post);

    if(prevPost) {
        const postType = prevPost.post_type;
        return `<a href="/${postType}/${prevPost.slug}">${prevPost.title}</a>`;
    } else {
        return '';
    }
    
}