const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport');
const User = require('./models/userModel');
require('dotenv').config({path:"../.env"})

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // console.log(profile.name.familyName);
        const [foundUser, _] = await User.getUserByGoogleId(profile.id);
        
        const user = foundUser[0];

        if (user){
          //user already exists, return the user data
          done(null, user);
        } else{
          //add user to db
          const googleId = profile.id;
          const fname = profile.name.givenName;
          const lname = profile.name.familyName;
          const email = profile.id; // because I have set it in my db to be unique
          const hash = "";
          const role= "user";

          const user = new User(fname, lname, email, hash, role, googleId);

          await user.save();

          done(null, user);
        }

        // done(null, profile);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) =>{
    done(null, user)
})

passport.deserializeUser((user, done) =>{
    done(null, user)
})