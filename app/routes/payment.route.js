const express = require("express");
const router = express.Router();
const PaymentsController = require("../controllers/payment.controller");
const { verifyToken } = require("../middlewares/authJwt");

//getall
router.get("/", [verifyToken, PaymentsController.getall]);

//getbyid
router.get("/:id", [verifyToken, PaymentsController.getByid]);

//add payment
router.post("/newpayment", [verifyToken, PaymentsController.addPayment]);

//delete payment
router.delete("/remove/:id", [verifyToken, PaymentsController.deletePayment]);
module.exports = router;
