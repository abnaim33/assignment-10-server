const { default: mongoose } = require("mongoose");
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const productRoute = require('./routes/productRoute')
const orderRoute = require('./routes/orderRoute')
app.use(cors())
app.use(bodyParser.json())


app.use('/api', productRoute)
app.use('/api', orderRoute)

// connecting to database
mongoose.connect(process.env.DB_URI
)
    .then((data) => {
        console.log(`Mongodb connected with server`);
    })

app.get("/", (req, res) => {
    res.send("Hello world")
})






app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`))