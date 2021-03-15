const express = require("express");
const RateController = require("../controllers/rateController");
const { verifyToken } = require("../middlewares/authJwt");
const router = express.Router();

router.post("/rate", [verifyToken, RateController.RateProduct]);
router.get("/", [verifyToken, RateController.getRates]);
router.get("/:stars", [verifyToken, RateController.getRateByStars]);
router.delete("/:id", [verifyToken, RateController.unrate]);
router.put("/:id", [verifyToken, RateController.updateRate]);

module.exports = router;
