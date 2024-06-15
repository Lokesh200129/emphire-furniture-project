const mongoose = require('mongoose');

const url= process.env.MONGO_CONNECTION_LINK

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