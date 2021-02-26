const express = require("express");
const router = express.Router();
const PaymentsController = require("../controllers/payment.controller");
const { verifyToken } = require("../middlewares/authJwt");

//getall
router.get("/", [verifyToken, PaymentsController.getall]);

//getbyid
router.get("/:id", [verifyToken, PaymentsController.getByid]);

//add payment
<<<<<<< HEAD
router.post("/new", verifyToken, PaymentsController.addPayment);

//delete payment
router.delete("/:id", verifyToken, PaymentsController.deletePayment);
=======
router.post("/newpayment", [verifyToken, PaymentsController.addPayment]);

//delete payment
router.delete("/remove/:id", [verifyToken, PaymentsController.deletePayment]);
>>>>>>> 64c6cc205e1d905f82ae1b8a39d6fd86f4058df7
module.exports = router;
