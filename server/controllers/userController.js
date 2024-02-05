const User = require('../models/userModel')

exports.getUserById = async (req, res, next) =>{
    try {
        let userId = req.params.id;
        let [user, _] = await User.findById(userId); // _ because we dont use the second value

        res.status(200).json({user});
    } catch (error) {
        console.log(error);
        next(error); //send it to global error handler
    }
}

exports.getAllUsers = async (req, res, next) =>{
    try {
        const [users, _] = await User.findAll();  

        res.status(200).json({count: users.length, users});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.updateUser = async (req, res, next) =>{
    try {
        let userId = req.params.id;
        let user_fname = req.body.fname; 
        let user_lname = req.body.lname;
        const [updatedUser, _] = await User.updateById(userId, user_fname, user_lname)

        res.status(200).json({updatedUser});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.deleteUser = async (req, res, next)=>{
    try {
        let userId = req.params.id;
        await User.deleteById(userId);

        res.status(200).json({"message" : "User has been deleted"});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

