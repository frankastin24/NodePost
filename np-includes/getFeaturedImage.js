const getPostMeta = require('./getPostMeta');

module.exports = async (post) => {
   const image = getPostMeta(post,'featured_image');
   return image ? image : '';
}