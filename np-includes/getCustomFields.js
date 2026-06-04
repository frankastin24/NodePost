const PostMetaField = require('../models/PostMetaField')

module.exports = async (cpt) => {

   const fields = await PostMetaField.findAll({
        where : {
            cpt
        }
   })

   return fields;

}