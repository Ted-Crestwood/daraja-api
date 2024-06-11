const express = require('express');
const { Pay } = require('../controllers/pay.controller');
const handlePay = require('../controllers/pay.controller');
const paymentPush = require('../controllers/stk.controller');
const router = express.Router()

router.post('/', paymentPush)
module.exports = router;