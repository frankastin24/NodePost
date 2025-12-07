const Option = require('../models/Option')


const update_option = async (name,value) => {
   
    
   const foundOptions = await Option.findAll({
        where: {
            key: name
        }
    })

    if(typeof value !== 'string') {
        value = JSON.stringify(value);   
    }

    if(foundOptions.length == 0) {
        const newOption = Option.build({
            key:name,
            value:value
        })
        newOption.save();
    } else {
        foundOptions[0].value = value;
        foundOptions[0].save();
    }

}

const get_option = async (name) => {
    if(typeof name == 'undefined') {
        return NPError(__dirname+'options.js:37', 'Option name undefined');
    }
   
    
   const foundOptions = await Option.findAll({
        where: {
            key: name
        }
    })
    

    if(foundOptions.length == 0) {
        return false;
    }

    
    if(isJson(foundOptions[0].value)) {
        const parsedJSON =  JSON.parse(foundOptions[0].value);

        return parsedJSON;
    } else {
        return foundOptions[0].value;
    }

}

const isJson = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const delete_option = (name) => {
     const foundOptions = Option.findAll({
        where: {
            key: name
        }
    })

    if(foundOptions.length == 0) {
        return false;
    }

    foundOptions[0].delete();
    return true;
} 

module.exports = {update_option,get_option,delete_option};