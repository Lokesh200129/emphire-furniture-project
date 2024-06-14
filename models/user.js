const mongoose = require('mongoose')
const passportLocalMongoose = require("passport-local-mongoose")
const contactSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true,
    },
   
})
contactSchema.plugin(passportLocalMongoose);

module.exports  = mongoose.model('User', contactSchema);
