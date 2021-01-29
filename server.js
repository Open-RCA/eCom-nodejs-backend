const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("./app/models");

const app = express();


let corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

let MONGO_URI = "mongodb+srv://admin:amdin@2020@cluster0.1n16l.mongodb.net/bosses-ecommerce?retryWrites=true&w=majority"

//connect to MongoDB server
db.mongoose.connect(MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
  });


app.get('/', (req, res) => {
    res.send("Welcome to open rca's e-commerce")
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});