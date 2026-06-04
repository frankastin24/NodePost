const Taxonomy = require('../models/Taxonomy')
module.exports = async (slug,title,termName,postTypes) => {

    const foundTaxonomies = await Taxonomy.findOne({
        where : {
            slug : slug
        }
    })

    if(foundTaxonomies) {

        return foundTaxonomies.id;

    } else {

        const newTaxonomy = await Taxonomy.build({
            title : title,
            slug : slug,
            termName : termName,
            cpts : JSON.stringify(postTypes)
        })

        await newTaxonomy.save()
        return newTaxonomy.id;

    }
    
   
}