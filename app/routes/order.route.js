const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller");
const { verifyToken } = require("../middlewares/authJwt");

//getall
router.get("/", [verifyToken, OrderController.getall]);

//getbyid
router.get("/:id", [verifyToken, OrderController.getByid]);

//new order
router.post("/new", [verifyToken, OrderController.newOrder]);

//delete order
router.delete("/:id", [verifyToken, OrderController.deleteOrder]);

module.exports = router;
