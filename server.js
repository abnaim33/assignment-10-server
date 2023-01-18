const { default: mongoose } = require("mongoose");
const cloudinary = require('cloudinary')
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

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    res.status(status);
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});


app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`))