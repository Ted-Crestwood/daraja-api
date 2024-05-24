const express = require("express")
const { safaricomTransaction, handleCallback} =  require("../controllers/payment.controller")
const router = express.Router()

// router.get("/",Payment);
router.post("/", safaricomTransaction)
router.post("/", handleCallback)

module.exports = router;
