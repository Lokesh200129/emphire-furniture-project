const express = require('express');
const router = express.Router();
const User = require('../models/user')
const passport = require("passport");
const { isLoggedIn } = require("../middleware")
const localstatergy = require("passport-local");

router.get("/signup", isLoggedIn, (req, res) => {
    res.render("user/signup.ejs");
})
router.post("/signup", isLoggedIn, async (req, res) => {
    try {
        let data = req.body;
       
        // register method is used to save user data in db
        let registereduser = await User.register(data, data.password);
        req.flash("sucess", "Signed up sucessfully")

        res.redirect("user/signup.ejs")
        req.logIn(registereduser, (error) => {
            if (error) {
                return next(error)
            }
        })
    }
    catch (error) {
        console.log(error);
    }
})
router.get("/login", (req, res) => {
    res.render("user/login.ejs")
})
router.post("/login", passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), (req, res) => {
    req.flash("sucess", "Login sucessfully")

    res.redirect("/dashboard");
    // console.log(req.user);
})
router.get("/logout", (req, res, next) => {
    req.logOut((error) => {
        if (error) {
            return next(error)
        }
        req.flash("sucess", "LogOut sucessfully")

        res.redirect("/")

    })
})


module.exports = router
