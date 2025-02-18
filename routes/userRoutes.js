const express = require("express")
const { getAllUser, getOneUser, createUser, updateUser, userLogin, deleteOneUser, deleteAllUsers} = require("../controller/userController")

const routes = express.Router()

routes.get("/", getAllUser)
routes.get("/login", userLogin)
routes.get("/:id", getOneUser)

routes.post("/create", createUser)

routes.patch("/:id", updateUser)

routes.delete("/:id", deleteOneUser)
routes.delete("/delete", deleteAllUsers)

module.exports = routes