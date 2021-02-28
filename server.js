const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes=require('./app/routes/productRoute')
const userRoutes=require('./app/routes/user.routes')
const rateRoutes=require('./app/routes/ratingRoute')
const authRoutes=require('./app/routes/auth.routes')
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
// require("./app/routes/auth.routes")(app);
// require("./app/routes/user.routes")(app);
// require("./app/routes/cart.routes")(app);
app.use("/api/cart", require("./app/routes/cart.routes"));
app.use("/api/wishlist", require("./app/routes/wishlist.routes"));

app.use("/api/users/", userRoutes);
app.use("/api/products/", productRoutes);
app.use("/api/rating/", rateRoutes);
app.use("/api/auth/", authRoutes);

app.use("/api/category", require("./app/routes/category"));
app.use("/api/subcategory", require("./app/routes/sub-categories"));
app.use("/api/order", require("./app/routes/order.route"));
app.use("/api/payment", require("./app/routes/payment.route"));
app.use("/api/orderdetails", require("./app/routes/orderdetails.routes"));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
