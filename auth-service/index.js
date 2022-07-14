const express = require('express');
const session = require('express-session');
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require('dotenv')
const passport = require('passport');
const connectDB = require('./config/database')
const MongoStore = require('connect-mongo');
const cookieParser = require("cookie-parser");

dotenv.config({path: './config/config.env'})

require('./config/passport');

const app = express();

connectDB();

/*
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
*/


app.use(
  cors({
       origin: "http://localhost:3000", // allow to server to accept request from different origin
       methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
       credentials: true, // allow session cookie from browser to pass through
 })
);

app.use(
  session({ 
    secret: 'keyboard cat', 
    resave: false, 
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000 //cookie has 1 hour age
    },
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI,})
  })
);
//app.use(cookieParser("keyboard cat"));
app.use(bodyParser.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("./routes/auth"));

/*
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

*/

app.listen(5000, () => console.log('listening on port: 5000'));
