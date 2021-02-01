const express = require('express')
const rateController = require('../controllers/rateController')
const router = express.Router()

router.post('/rate', rateController.RateProduct)
router.get('/', rateController.getRates)
router.get('/:stars', rateController.getRateByStars)
router.delete('/:id', rateController.unrate)
router.put('/:id', rateController.updateRate)

module.exports = router