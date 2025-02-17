const userModel = require("../model/userModel")
const bcrypt = require("bcrypt")

const getAllUser = async (req, res) => {
    try {
        const allUsers = await userModel.find()
        return res.status(201).json({data: allUsers})
    } catch (error) {
        return res.status(500).json({message: "An error occured", error})
    }
}

const getOneUser = async (req, res) => {
    try {
        const oneUser = await userModel.findById(req.params.id)

        if(!oneUser) {
            return res.status(404).json({message: "User not found"})
        }else{
            res.status(200).json({message: "User Found", data: oneUser})
        }
    }catch(error) {
        return res.status(500).json({message: "An error occured",error})
    }
}

const createUser = async (req, res) => {
    try{
    const {name, password, email} = req.body

    const hashPassword = await bcrypt.hash(password, 10)

    const checkForUser = await userModel.findOne({email})

    if(checkForUser) {
        return res.status(401).json({message: "User already exist"})
    }
    const user = await userModel.create({name, password: hashPassword, email})

    return res.status(201).json({message: "User created", data: user})

    }catch(error) {
       return res.status(500).json({message: "An error occured", error: error.message})
    }    
}

module.exports = {getAllUser, getOneUser, createUser}