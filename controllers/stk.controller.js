const Status = require("../models/Status");
const handlePay = require("../utils/stkPush");

const paymentPush = (req, res) => {
   try {
    const data = req.body.stkCallback.CallbackMetadata.Item;
    const code = req.body.stkCallback.ResultCode;
    const id = req.body.stkCallback.MerchantRequestID;
    Status.create({ data: data, code: code, id: id })
    return res.status(201).json("success");
   } catch (error) {
    return res.status(500).json({message:error.message})
   }
}
const transactionStatus = (req, res) => {
    try {
        const transaction = req.raw_body;
        console.log(transaction, "dats")
        res.status(201).json({ message: 'Transaction done' })
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = { paymentPush, transactionStatus }