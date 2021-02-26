const express = require('express')
const rateController = require('../controllers/rateController')
const { verifyToken } = require('../middlewares/authJwt')
const router = express.Router()

router.post('/rate', [verifyToken, rateController.RateProduct])
router.get('/', [verifyToken, rateController.getRates])
router.get('/:stars', [verifyToken,rateController.getRateByStars])
router.delete('/:id', [verifyToken, rateController.unrate])
router.put('/:id', [verifyToken, rateController.updateRate])

module.exports = router