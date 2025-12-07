const User = require('../models/User');
const argon2 = require('argon2');
module.exports =  async (username, password) => {
    const Users =  await User.findAll({
        where: {
            username: username
        }
    })


    if (Users.length > 0) {

        const options = {
        type: argon2.argon2id,   // Argon2id recommended
        timeCost: 2,             // iterations (increase as you benchmark)
        memoryCost: 19 * 1024,   // 19 MiB expressed in KiB (OWASP minimum); tune upward
        parallelism: 1,
        // saltLength: 16,       // lib generates a random salt automatically
        };
        
        const verify = await argon2.verify(Users[0].password,password); // returns encoded hash string
        
        
        if (verify) {

            return {

                user: Users[0],
                error: false,

            }

        } else {
            return {
                error: true,
                message: 'Password incorrect'

            }
        }

    } else {
        return {
            error: true,
            message: 'User not found'

        }
    }
}