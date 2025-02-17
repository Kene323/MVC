const mongoose = require("mongoose")
require("dotenv/config")
const {MONGODB_URL} = process.env

const dbConfig = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log(`Connected to DB`);
    } catch (err) {
        console.log(`An error occured while trying to connect`, err);
    }
}

module.exports = dbConfig