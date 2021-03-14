const express = require("express");
const router = express.Router();
const DetailsController = require("../controllers/orderdetails.controller");
const { verifyToken } = require("../middlewares/authJwt");

//getall
router.get("/", [verifyToken, DetailsController.getall]);

//getbyid
router.get("/:id", [verifyToken, DetailsController.getByid]);

//add details for order
// router.post("/add", verifyToken, DetailsController.addDetails);

//remove
router.delete("/remove/:id", [verifyToken, DetailsController.deleteDetails]);

module.exports = router;
