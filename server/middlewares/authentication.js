const { verifyToken } = require('../helpers/jwt');
const {User} = require("../models");

async function Authentication(req, res, next) {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        next({name:"Unauthorized"})
        return;
    }
    
    const [type, token] = bearerToken.split(" ");
    if (!token) {
        next({name:"Unauthorized"})
        return;
    }

    
    try {
        const data = verifyToken(token);

        const user = await User.findByPk(data.id);
        if (!user) {
            next({name:"Unauthorized"})
        return;
        }
        
        req.user = user;
        next();
    } catch (error) {
        next(error)
    }
}

module.exports = {Authentication}