const mongoose = require('mongoose')

// Define the article schema
const articleScheme = new mongoose.Schema({
    image:{
        type: String,
        required: true
    },
    category:{
        type: String,
        enum: ['door','chair', 'table', 'bed', 'sofa','cabinet', 'reck', 'dinning', 'other'],
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
    
})

const product = mongoose.model('product', articleScheme);
module.exports = product;