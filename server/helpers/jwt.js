var jwt = require('jsonwebtoken')

const secretkey = process.env.JWT_SECRET_KEY

function signToken(data) {
    return jwt.sign(data, secretkey)
}

function verifyToken(token) {
    return jwt.verify(token, secretkey)
}

module.exports = {
    signToken,
    verifyToken
}