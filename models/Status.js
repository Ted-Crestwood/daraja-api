const { Schema, model } = require("mongoose");

const transactionStatus = new Schema({
    phone:{type:Number},
    statusCode:{type:Number},
    amount:{type:Number}
})
const Status = model('Status', transactionStatus)
module.exports = Status;
