const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.static("dist"))
app.use(cors({
    origin: process.env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : process.env.LIVE_SERVER,
    credentials: true
}))

app.use("/api/auth", require("./routes/auth.route"))
app.use("/api/admin", require("./routes/admin.route"))
// app.use("/api/user", require("./routes/user.routes"))

app.use("*", (req, res) => {
    res.status(404).json({ message: "Resource Not found" })
})
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: `Server Error${err.message}` })
})

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log('MONGO CONNECTED')
    app.listen(process.env.PORT, console.log((`SERVER RUNNING`)))
})

