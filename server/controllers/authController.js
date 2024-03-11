const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const createError = require('../utils/error')
const jwt = require('jsonwebtoken')
require('dotenv').config({path:"../.env"})

exports.register = async (req, res, next) =>{
    try {
        let {fname, lname, email, password, role, googleId} = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const user = new User(fname, lname, email, hash, role, googleId);

        await user.save();

        res.status(201).json({
            message:"Created new User",
            user: {
                fname: user.fname,
                lname: user.lname,
                email: user.email,
            }  
        });
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.login = async (req, res, next) =>{

    try {
        const { email, password } = req.body;
    
        if (!email || !password) return res.status(400).json({
            'message': 'Email and password required'
        });
    
        const [foundUser, _] = await User.getUserByEmail(email);
    
        const user = foundUser[0];
    
        if (!user) return res.sendStatus(401); // unauthorized
    
        const match = await bcrypt.compare(password, user.password);
        
        if (match){
            
            const {password:pwd, role, user_id, ...otherDetails} = user;

            const accessToken = jwt.sign(
                { 
                    "UserInfo": {
                        "email": user.email,
                        "role": role,
                        "user_id": user.user_id 
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '300s' }
            );
            
            const refreshToken = jwt.sign(
                { "email": user.email },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
    
            user.refreshToken = refreshToken;
    
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000});

            res.json({accessToken, role, user_id});
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}