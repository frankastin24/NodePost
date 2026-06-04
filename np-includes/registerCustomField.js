const PostMetaField = require('../models/PostMetaField')
module.exports = async (field) => {

    const newField = PostMetaField.build({
        cpt : field.cpt,
        title : field.title,
        type : field.type,
        isolateToPost : (field.isolateToPost ? true : false),
        postToIsolate : (field.isolateToPost ? field.isolateToPost : 0)
    })

    await newField.save();
}