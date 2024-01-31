const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
require('dotenv').config({path:"../.env"})

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// Connect to db later
// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     //   return cb(err, user);
//     // });
//   }
// ));

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) =>{
    done(null, user)
})

passport.deserializeUser((user, done) =>{
    done(null, user)
})
