const cookieSession = require('cookie-session')
const express = require('express');
const passport = require('passport');
const passportSetup = require('./passport')
const cors = require('cors')
const app = express()
const authRoute = require("./routes/auth")

app.use(cookieSession({
    name:"session",
    keys:["mpsp2308"],
    maxAge: 24 * 60 * 60 * 100   // 1 day
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin:"http://localhost:5173",
    methods:"GET, POST, PUT, DELETE",
    credentials:true,
}));

app.use("/auth", authRoute);

app.listen(7000, () => {console.log("Server started on port 7000")})