const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./app/config/db.config')
const productRoutes=require('./app/routes/productRoute')
const userRoutes=require('./app/routes/user.routes')
const rateRoutes=require('./app/routes/ratingRoute')
const authRoutes=require('./app/routes/auth.routes')
const authJwt = require("./app/middlewares/authJwt")
const app = express();


app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send("Welcome to open rca's e-commerce")
})

// routes

 app.use("/api/users/", userRoutes);
 app.use('/api/products/',productRoutes)
 app.use('/api/rating/',rateRoutes)
 app.use('/api/auth/',authRoutes)

// app.use("/api/products",productRoutes)


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});