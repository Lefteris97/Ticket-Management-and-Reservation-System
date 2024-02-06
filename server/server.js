const cookieSession = require('cookie-session')
const express = require('express')
const passport = require('passport')
require('./passport')
const cors = require('cors')
const authRoutes = require("./routes/authRoutes")
const usersRoutes = require("./routes/usersRoutes")
const eventsRoutes = require("./routes/eventsRoutes")
const ticketsRoute = require("./routes/ticketsRoute")
const standsRoutes = require("./routes/standsRoutes")
const cookieParser = require('cookie-parser')

const app = express()

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

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json()); //to send json

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/events", eventsRoutes);
app.use("/stands", standsRoutes);
app.use("/tickets", ticketsRoute);

//global error handling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "An error has occured!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage
    });
})

app.listen(7000, () => {console.log("Server started on port 7000")});