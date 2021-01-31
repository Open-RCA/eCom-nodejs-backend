const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./app/config/db.config')

const app = express();


let corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send("Welcome to open rca's e-commerce")
})

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
// require("./app/routes/cart.routes")(app);
app.use('/api/cart', require('./app/routes/cart.routes'))
app.use('/api/wishlist', require('./app/routes/wishlist.routes'))

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});