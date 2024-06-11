const express = require("express")
const { safaricomTransaction} =  require("../controllers/payment.controller")
const { stkPush, handleCallback } = require("../controllers/stk.controller")
const router = express.Router()

// router.get("/",Payment);
router.post("/", safaricomTransaction)
// router.get('/callback', handleCallback)
module.exports = router;
