const express = require('express');
const router = express.Router();
const product = require("../models/article");
const { isLoggedIn } = require('../middleware');


router.get("/contact", (req, res) => {
    res.render("contact.ejs")
})
router.post("/contact", async (req, res) => {
    try {
        req.flash("success", "Contact Detail Sent, Thank you")
        res.redirect("/contact")
    } catch (error) {
        res.send("error occured in saving contact")
    }
})
router.get("/dashboard", isLoggedIn, async (req, res) => {
    try {
        const data = await product.find({});
        res.render('dashboard/dashboard.ejs', { data })
        
    } catch (error) {
        console.log("error occured! please login for accesing dashboard ");
    }
    
})


router.get("/about", (req, res) => {
    res.render("about.ejs")

})

module.exports = router;