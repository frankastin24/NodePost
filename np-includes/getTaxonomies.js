const Taxonomy = require('../models/Taxonomy');

module.exports = (requestedCPT = false) => {
    const taxonomies = Taxonomy.findAll();
    
    if (requestedCPT) {
        const returnArray = [];
        taxonomies.forEach((tax) => {
            tax.cpts = JSON.parse(tax.cpts);

            tax.cpts.forEach((cpt) => {
                if (cpt == 'all') {
                    returnArray.push(tax);
                }
                if (cpt == requestedCPT) {
                    returnArray.push(tax)
                }
            })

        })

        return returnArray;

    } else {
        
         taxonomies.forEach((tax) => {
            tax.cpts = JSON.parse(tax.cpts);
         })

        return taxonomies;
    }




}