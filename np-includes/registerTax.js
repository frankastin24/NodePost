const Taxonomy = require('../models/Taxonomy')
module.exports = async (tax) => {

    const foundTaxes = await Taxonomy.find({
        where : {
            slug : tax.slug
        }
    })

    if(foundTaxes.length > 0) {

        return foundTaxes[0].idl

    } else {

        const newTax = await Taxonomy.build({
            title : tax.title,
            slug : tax.slug,
            termName : tax.termName,
            cpts : JSON.stringify(cpts)
        })

        await newTax.save()
        return newTax.id;

    }
    
   
}