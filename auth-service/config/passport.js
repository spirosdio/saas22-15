const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/user')

const GOOGLE_CLIENT_ID = '967677445530-4ggtr8c04idh9tf2n1sg6tes8lkf54c6.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback",
  //passReqToCallback: true,
},
async (/*request,*/ accessToken, refreshToken, profile, done) => {
  const newUser = {
    googleId: profile.id,
    displayName: profile.displayName,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    image: profile.photos[0].value,
  }

  try {
    let user = await User.findOne({ googleId: profile.id })

    if (user) {
      done(null, user);
    } else {
      user = await User.create(newUser)
      done(null, user)
    }
  } catch (err) {
    console.error(err)
  }
  //return done(null, profile);
}));


/*
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
*/
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user))
})
