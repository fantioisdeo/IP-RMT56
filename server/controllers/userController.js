const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const {OAuth2Client} = require('google-auth-library');  

exports.register = async (req, res, next) => {
    try {
        const data = await User.create(req.body)

        res.status(201).json({
            id: data.id,
            email: data.email,
        });

    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {  
        const {email, password} = req.body;

        if (!email) {
            const error = new Error('Email is required');
            error.name = 'Bad Request';
            return next(error);
        }

        if (!password) {
            const error = new Error('Password is required');
            error.name = 'Bad Request';
            return next(error);
        }

        const user = await User.findOne({ where: {email} })
        if (!user) {
            const error = new Error('Invalid email/password');
            error.name = 'Unauthorized';
            return next(error);
        }

        const isValidPassword = comparePassword(password, user.password);
        if (!isValidPassword) {
            const error = new Error('Invalid email/password');
            error.name = 'Unauthorized';
            return next(error);
        }

        const access_token = signToken({id: user.id});
        res.status(200).json({ access_token })
    } catch (error) {
        console.log(error);
        
        next(error)
    }
}

exports.loginGoggle = async (req, res, next) => {
    try {  
        const client = new OAuth2Client();

        const ticket = await client.verifyIdToken({
            idToken: req.body.googleToken,
            audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();

        const user = await User.findOne({where: {email: payload.email}})
        if (!user) {
            // throw { name: "Unauthorized", message: "Invalid email/password"};
            await User.create({fullName: payload.name, email: payload.email, password: Math.random().toString()});
        }

        const access_token = signToken({id: user.id});
        // const userid = payload['sub'];
        // If the request specified a Google Workspace domain:
        // const domain = payload['hd'];

        res.status(200).json({ message: "Login Success", access_token })
    } catch (error) {
        console.log(error);
        
        next(error)
    }
}