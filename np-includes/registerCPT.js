const CustomPostType = require('../models/CustomPostType')
module.exports = async (cpt) => {

    const FoundCPTs = await CustomPostType.findAll({
        where : {
            slug : cpt.slug
        }
    })

    if(FoundCPTs.length > 0) {
    
        return FoundCPTs[0].id
    
    } else {

        const newCPT = await CustomPostType.build(cpt)

        await newCPT.save()
        return newCPT.id;

    }
    
   
}