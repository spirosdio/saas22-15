const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv')
const passport = require('passport');
const connectDB = require('./config/database')
dotenv.config({path: './config/config.env'})

require('./config/passport');

const app = express();

connectDB();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'cas', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Sign In with Google</a>');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: [  'profile' ] }
));

app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/connected',
    failureRedirect: '/auth/google/failure'
  })
);

app.get('/connected', isLoggedIn, (req, res) => {
  res.send(`Hey ${req.user.displayName}`+ '<a href="/logout">Sign Out</a>');
});

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Authentification Failed..');
});

app.listen(5000, () => console.log('listening on port: 5000'));