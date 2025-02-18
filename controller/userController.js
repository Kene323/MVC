const userModel = require("../model/userModel")
const bcrypt = require("bcrypt")

//      GET ALL USERS
const getAllUser = async (req, res) => {
    try {
        const allUsers = await userModel.find()
        return res.status(201).json({data: allUsers})
    } catch (error) {
        return res.status(500).json({message: "An error occured", error})
    }
}

//      USER-LOGIN
const userLogin = async (req, res) => {
    try { 
        const {email, password} = req.body
        const checkUser = await userModel.findOne({email})

        if(!checkUser || checkUser.password !== password) {
            res.status(404).json({message: "Invalid email or password"})
        }
         else {
            res.status(200).json({message: "Welcome!!", user: {_id: checkUser._id, name: checkUser.name, email: checkUser.email}})
        }
    } catch (err) {
        res.status(500).json({status: false, error: err.message})
    }
}

//      GET ONE USER
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

//      CREATE A USER
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

//      UPDATE A USER
const updateUser = async (req, res) => {
    try {
        const { name, password, email} = req.body
        const update = await userModel.findByIdAndUpdate(
            req.params.id,
            {name, password, email},
            {new: true}
        )

        if(!update) {
            res.status(404).json({message: "User not found"})
        } else {
            res.status(200).json({message: "User Updated", data: update})
        }
    }catch(error) {
        res.status(500).json({message: "An error occured", error})
    }
}

//       DELETE A USER
const deleteOneUser = async (req, res) => {
    try {
        const deleteUser = await userModel.findByIdAndDelete(req.params.id);
        if (!deleteUser) {
          res.status(404).json({ message: "user not found" });
        }
        res.status(200).json({message: "user deleted", data: deleteUser});
      } catch (error) {
        res.status(500).json({ message: "An error occured", error });
      }
}

//      DELETE ALL USERS
const deleteAllUsers = async (req, res) => {
    try {
       const deleteTheUsers = await userModel.deleteMany();
    
        if(!deleteAllUsers) {
            res.status(404).json({message: "No user found"})
        }
        res.status(200).json({message: "all user deleted"});

      } catch (error) {
        res.status(500).json({ status: false, error: error.message });
      }
}

module.exports = {getAllUser, getOneUser, createUser, updateUser, userLogin, deleteOneUser, deleteAllUsers}