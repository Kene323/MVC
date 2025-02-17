const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    password:{ 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
})

module.exports = userModel = model("userDbNew", userSchema)