// const jwt = require('jsonwebtoken')
// const createError = require('./error.js')

// const verifyToken = (req, res, next) =>{
//     const token = req.cookies.access_token;
//     // console.log(token)

//     if (!token) return next(createError(401, "You are not authenticated!"));

//     jwt.verify(token, process.env.JWT_KEY, (err, user) =>{

//         if (err) return next(createError(403, "Token is not valid!"));

//         req.user = user;
//         next();
//     })
// }

// const verifyUser = (req, res, next) =>{
//     //to verify a user he needs to be authenticated first
//     verifyToken(req, res, next, () =>{
//         // only the owner of the account or the admin can delete the user account
//         if(req.user.user_id === req.params.id || req.user.role === "admin"){
//             next();
//         }else{
//             return next(createError(403, "You are not authorized!"));
//         }
//     })
// }

// const verifyAdmin = (req, res, next) =>{
//     //to verify a user he needs to be authenticated first
//     verifyToken(req, res, next, () =>{
//         if(req.user.role === "admin"){
//             next();
//         }else{
//             return next(createError(403, "You are not an admin!"));
//         }
//     })
// }

// const verifyTicketCollector = (req, res, next) =>{
//     //to verify a user he needs to be authenticated first
//     verifyToken(req, res, next, () =>{
//         if(req.user.role === "ticket collector"){
//             next();
//         }else{
//             return next(createError(403, "You are not a ticket collector!"));
//         }
//     })
// }

// module.exports = { verifyToken, verifyUser, verifyAdmin, verifyTicketCollector };

const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) =>{
            if (err) return res.sendStatus(403);  //invalid token
            req.user = decoded.UserInfo.email;
            req.role = decoded.UserInfo.role;
            req.user_id = decoded.UserInfo.user_id;
            next();
        }
    );
}

module.exports = verifyToken