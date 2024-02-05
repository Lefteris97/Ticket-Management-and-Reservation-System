const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const createError = require('../utils/error')
const jwt = require('jsonwebtoken')
require('dotenv').config({path:"../.env"})

exports.register = async (req, res, next) =>{
    try {
        let {fname, lname, email, password, role} = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const user = new User(fname, lname, email, hash, role);

        await user.save();

        res.status(201).json({message:"Created new User"});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.login = async (req, res, next) =>{
    try {
        // let eventId = req.params.id;
        // let [event, _] = await Event.findById(eventId); // _ because we dont use the second value
        let { email, password } = req.body;

        const [userRow, _ ]= await User.getUserByEmail(email);

        if (userRow.length === 0) return next(createError(404, "User not found!"));

        const user = userRow[0];

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));
        
        //delete users input for password
        // delete user.password;

        //if the password is correct create new token
        const token = jwt.sign({id:user.user_id, role:user.role}, process.env.JWT_KEY);

        //destruction of user  
        const {password:pwd, role, created_at, ...otherDetails} = user;

        res.cookie("access token", token, {
            httpOnly:true
        }).status(200).json({
            details: {...otherDetails}, 
            role
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}