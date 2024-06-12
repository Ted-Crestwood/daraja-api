const handlePay = require("../utils/stkPush");

const paymentPush = (req, res) => {
    try {
        const data = req.raw_body;
        console.log(data, "dats")
        res.status(201).json({ message: 'Transaction initiated' })
    } catch (error) {
        console.log(error.message)
    }
}
const transactionStatus =(req,res)=>{
    try {
        const transaction = req.raw_body;
        console.log(transaction, "dats")
        res.status(201).json({ message: 'Transaction done' })
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {paymentPush,transactionStatus}