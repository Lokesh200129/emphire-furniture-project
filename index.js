require('dotenv').config()
const express = require('express');
const app = express();
const path = require("path");
const {main} = require("./db")
const passport = require("passport");
const localstatergy = require("passport-local");
const session = require("express-session");
const flash = require('connect-flash');
const User = require("./models/user");
const methodOverride = require('method-override');
const cloudinary = require('cloudinary').v2
const { isLoggedIn } = require("./middleware")


// middlewares 
// this middleware help to undcerstand the data  to exress
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'))

const sessionOption = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000

    }
}
// session is used for uniquely identify the user is using the site 
app.use(session(sessionOption));
// passport initialize 
app.use(passport.initialize());
// passport use session to identify that same user is browsing in same browser
app.use(passport.session())
passport.use(new localstatergy(User.authenticate()));
// serializeUser is use to store data in session
passport.serializeUser(User.serializeUser());
// deserializeUser is used to delete data from session store
passport.deserializeUser(User.deserializeUser());
app.use(flash());


app.use((req, res, next) => {

    res.locals.currUser = req.user;
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    next();
})

app.get("/",  (req, res) => {

    res.render('index')
})

// Import the router file
const productRoute = require('./routes/productRoute');
// Use the routes
app.use("/product", productRoute);
// User routes
const userRoute = require("./routes/userroute");
app.use("/", userRoute);
// Import the main router file
const mainRoute = require('./routes/mainRoute');
// const { isLoggedIn } = require('./middleware');
app.use("/", mainRoute);

app.listen(8080, () => {
    console.log("server started")
})