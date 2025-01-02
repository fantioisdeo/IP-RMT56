function errorHandler(error, req, res, next) {
    // console.log(" ~ errorhandler ~ err:", error);
    
    switch (error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            return res.status(400).json({ message: error.errors[0].message})
        case "Bad Request":
            return res.status(400).json({ message: error.message})
        case "Unauthorized":
            return res.status(401).json({ message: error.message ?? 'Invalid token'})
        case "JsonWebTokenError":
            return res.status(401).json({ message: 'Invalid token'})
        case "Forbidden Error":
            return res.status(403).json({ message: error.message})
        case "Forbidden":
            return res.status(403).json({ message: `You're not authorized`})
        case "Not Found":
            return res.status(404).json({ message: error.message})
        default:
            return res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = {errorHandler}
