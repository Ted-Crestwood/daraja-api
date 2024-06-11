const express = require("express")
const {  handleCallback} =  require("../controllers/payment.controller")
const router = express.Router()

router.post("/", handleCallback)
// router.post("/:CheckoutRequestID", confirmPayment)
module.exports = router;
