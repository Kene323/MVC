const express = require("express")
const { getAllUser, getOneUser, createUser } = require("../controller/userController")

const routes = express.Router()

routes.get("/", getAllUser)
routes.get("/:id", getOneUser)

routes.post("/create", createUser)
module.exports = routes