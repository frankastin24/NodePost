const Taxonomy = require('../models/Taxonomy')
const Term = require('../models/Term')

module.exports = async (term) => {

    const newTerm = Term.build(term);

    await newTerm.save();

    return newTerm.id;

}