const db = require("../models");

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