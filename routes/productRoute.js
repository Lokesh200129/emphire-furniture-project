const express = require('express');
const router = express.Router();
const product = require("../models/article")
const { isLoggedIn } = require("../middleware")
const multer = require('multer')
const { storage } = require('../cloudConfig')
const upload = multer({ storage })

//  New product create form
router.get("/create", isLoggedIn, (req, res) => {
    try {
        res.render("create.ejs")

    } catch (error) {
        res.send("error occured! please login for create new product")
    }
})
// New product creation operation
router.post("/create", isLoggedIn, upload.single('product[image]'), async (req, res) => {
    try {
        let url = req.file.path;
        const response = new product(req.body.product)
        response.image = url;
        await response.save();
        req.flash("success", "Furniture Added sucessfully");
        res.redirect("/dashboard")

    }
    catch (error) {
        res.status(404).send("error saving data")
    }
})

// Show product
router.get("/", async (req, res) => {
    try {
        const data = await product.find({});
        res.render('content', { data })
    } catch (error) {
        console.log("error occured");
    }
})
// router.get("/category",  (req, res) => {
//         console.log(req.query);


// })
// Show product details
router.get("/:id", async (req, res) => {
    try {
        let { id } = req.params;
        const list = await product.findById(id);
        res.render("detail", { list });
    }
    catch (error) {
        res.send(`error occured ${error}`)
    }
})
// Update form
router.get("/:id/edit", isLoggedIn, async (req, res) => {
    try {

        let { id } = req.params;
        const list = await product.findById(id);
        res.render("edit", { list });
    }
    catch (error) {
        res.send(`error occured ${error}`);
    }
})
// update product
router.put("/update/:id", isLoggedIn, async (req, res) => {
    try {
        let { id } = req.params;
        let oldData = await product.findById(id);
        let newOldData = { 
            name: oldData.name,
            category: oldData.category,
            description: oldData.description,
            price: String(oldData.price),
        }
        let updateData = req.body.product;
      
        // console.log(newOldData);
        // console.log(updateData);
        if(JSON.stringify(newOldData) === JSON.stringify(updateData)){
             req.flash("error", "Product data is same, Please update")
            res.redirect(`/product/${id}/edit`)
        }
        else{
            await product.findByIdAndUpdate(id, updateData, { new: true })
            req.flash("success", "Furniture Updated sucessfully");
            res.status(200).redirect("/dashboard")
            
        }
       
       
    }
    catch (error) {
        res.status(404).json({ error: "not found" });
    }
});

// Delete route
router.delete("/delete/:id", isLoggedIn, async (req, res) => {
    try {
      
        let { id } = req.params;
        await product.findByIdAndDelete(id);
        req.flash("success", "Furniture Deleted sucessfully");
        res.status(200).redirect("/dashboard")

    }

    catch (error) {
        res.status(404).json({ error: "not found" });
    }
})
module.exports = router