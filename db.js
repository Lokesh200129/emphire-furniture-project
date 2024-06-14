const mongoose = require('mongoose');

const url= "mongodb://127.0.0.1:27017/furniture"

main()
    .then(() => {
        console.log("connection established with db");
    })
    .catch((err) => {
        console.log(`connection err ${err}`);
    })
async function main() {
    await mongoose.connect(url)
}


// exporting file to main js file 
module.exports= {main};