const CustomPostType = require('../models/CustomPostType');
module.exports = async (cpt) => {
    
    const foundCPTs = await CustomPostType.findAll({
        where : {
            id : cpt.id
        }
    });

    if(foundCPTs.length > 0 ) {
        foundCPTs[0].title = cpt.title;
        foundCPTs[0].slug = cpt.slug;
        foundCPTs[0].singular = cpt.singular;
        foundCPTs[0].plural = cpt.plural;
        foundCPTs[0].top_level = cpt.top_level;
        foundCPTs[0].use_rest = cpt.use_rest;
        foundCPTs[0].content_editor = cpt.content_editor;
        foundCPTs[0].page_builder = cpt.page_builder;
        await foundCPTs[0].save();
        return true;
    } else {
        return false;
    }
    

}