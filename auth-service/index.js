const express = require('express');
const session = require('express-session');
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require('dotenv')
const passport = require('passport');
const connectDB = require('./config/database')
const MongoStore = require('connect-mongo');
//const cookieParser = require("cookie-parser");

dotenv.config({path: './config/config.env'})

require('./config/passport');

const app = express();

connectDB();

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

app.use(bodyParser.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/userRoute"));


app.listen(5000, () => console.log('listening on port: 5000'));
