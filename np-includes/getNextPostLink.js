const getNextPost = require('./getNextPost');
module.exports = async (post) => {
    
    const nextPost = await getNextPost(post);

    if(nextPost) {
        const postType = nextPost.post_type;
        return `<a href="/${postType}/${nextPost.slug}">${nextPost.title}</a>`;
    } else {
        return '';
    }
    
}