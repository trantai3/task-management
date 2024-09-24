const mongoose = require('mongoose') // add module mongoose

module.exports.connect = async () => {   // check success or fail
    try {
        console.log(process.env.MONGO_URL)
        await mongoose.connect(process.env.MONGO_URL) // connect mongoose
        console.log("Connect Success!")
    } catch(error) {
        console.error("Connect Error!", error) // Print the actual error
    }
}
