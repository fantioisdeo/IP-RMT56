const { register, login, loginGoggle } = require("../controllers/userController")

const userRouter = require("express").Router();

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.post('/login/google', loginGoggle)

module.exports = userRouter;