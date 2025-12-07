const checkCreds = require('./checkCreds');

module.exports = async (context,username,password) => {

    const credcheck = await checkCreds(username,password);
   
    if(!credcheck.error) {
        
        context.req.session.userID = credcheck.user.id;

        return {
            error: false
        }

    } else {
        
        return credcheck;
    
    }

}