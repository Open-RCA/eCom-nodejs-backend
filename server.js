const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const productRoutes = require("./app/routes/productRoute");
const userRoutes = require("./app/routes/user.routes");
// const rateRoutes = require("./app/routes/ratingRoute");
const authRoutes = require("./app/routes/auth.routes");
require('./app/config/db.config')
const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to open rca's e-commerce");
});

// routes
const baseUrlRoute = "/api/";
app.use(`${baseUrlRoute}cart`, require("./app/routes/cart.routes"));
app.use(`${baseUrlRoute}wishlist`, require("./app/routes/wishlist.routes"));

app.use(`${baseUrlRoute}users/`, userRoutes);
app.use(`${baseUrlRoute}products/`, productRoutes);
// app.use(`${baseUrlRoute}rating/`, rateRoutes);
app.use(`${baseUrlRoute}auth/`, authRoutes);

app.use(`${baseUrlRoute}category`, require("./app/routes/category"));
app.use(`${baseUrlRoute}subcategory`, require("./app/routes/sub-categories"));
app.use(`${baseUrlRoute}order`, require("./app/routes/order.route"));
app.use(`${baseUrlRoute}payment`, require("./app/routes/payment.route"));
app.use(
  `${baseUrlRoute}orderdetails`,
  require("./app/routes/orderdetails.routes")
);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
