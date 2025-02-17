const express =  require("express")
require("dotenv/config")
const dbConfig = require("./config/db")
const route = require("./routes/userRoutes")

const {PORT} = process.env;
const port = PORT

const app = express()
dbConfig()

app.use(express.json())
app.use("/api", route)

app.listen(port, () => {
    console.log(new Date().toLocaleDateString(), port);
})