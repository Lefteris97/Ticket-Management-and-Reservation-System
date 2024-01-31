const router = require('express').Router();
const passport = require('passport')

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
    res.redirect("http://localhost:5173/");
})

// client request
router.get("/google", passport.authenticate("google", {scope: ["profile"]}));

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:5173/",
    failureRedirect: "/login/failed"
}))

module.exports = router