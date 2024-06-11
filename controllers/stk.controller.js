const handlePay = require("../utils/stkPush");

const paymentPush =(req,res)=>{
    try {
        const data = req.body;
    console.log(data.phone)
    res.status(201).json({message: 'Transaction initiated'})
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = paymentPush