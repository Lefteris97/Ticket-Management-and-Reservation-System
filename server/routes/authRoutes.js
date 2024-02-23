const router = require('express').Router()
const passport = require('passport')
const authController = require('../controllers/authController')
const jwt = require('jsonwebtoken')
require('dotenv').config({path:"../.env"})

//create new user
router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/login/succeeded", (req, res) =>{
    if(req.user){
        res.status(200).json({
            success: true,
            message: "successful authentication",
            user: req.user,
            cookies: req.cookies
        });
    }   
});

router.get("/login/failed", (req, res) =>{
    res.status(401).json({
        success: false,
        message: "error during authentication",
    });
});

router.get("/logout", (req, res)=>{
    req.logout();
    res.clearCookie('jwt', {httpOnly: true});
    res.redirect("http://localhost:5173/");
})

// client request
router.get("/google", passport.authenticate("google", {scope: ["profile"]}));

// router.get("/google/callback", passport.authenticate("google", {
//     successRedirect: "http://localhost:5173/",
//     failureRedirect: "/login/failed"
// }))  

router.get("/google/callback", passport.authenticate("google", ), (req, res) =>{
    if(req.user){

        //create jwt for google user
        const googleAccessToken = jwt.sign(
            {
                "UserInfo": {
                    "google_id": req.user.google_id,
                    "role": req.user.role
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '300s' }
        );

        res.cookie('google jwt', googleAccessToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000});

        res.redirect('http://localhost:5173/');
    } else {
        res.redirect('/login/failed');
    }
})  

module.exports = router