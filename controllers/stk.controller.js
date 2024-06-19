const Status = require("../models/Status");
const handlePay = require("../utils/stkPush");

const paymentPush = (req, res) => {
    const callbackData = req.body;
    console.log("callbackdata:", callbackData)
    // Check the result code
    const result_code = callbackData.Body.stkCallback.ResultCode;
    if (result_code !== 0) {
        // If the result code is not 0, there was an error
        const error_message = callbackData.Body.stkCallback.ResultDesc;
        const response_data = { ResultCode: result_code, ResultDesc: error_message };
        return res.json(response_data);
    }

    // If the result code is 0, the transaction was completed
    const body = req.body.Body.stkCallback.CallbackMetadata;

    // Get amount
    const amountObj = body.Item.find(obj => obj.Name === 'Amount');
    const amount = amountObj.Value

    // Get Mpesa code
    const codeObj = body.Item.find(obj => obj.Name === 'MpesaReceiptNumber');
    const mpesaCode = codeObj.Value

    // Get phone number
    const phoneNumberObj = body.Item.find(obj => obj.Name === 'PhoneNumber');
    const phone = phoneNumberObj.Value
    Status.create({phone:phone, amount:amount, statusCode:result_code})
    return res.json("success");
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