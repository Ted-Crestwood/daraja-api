const { Schema, model } = require("mongoose");

const safaricomPayment = new Schema({
    // orderRef:{type:String,required:true},
    phone:{type:Number},
    amount:{type:Number},
    code:{type:Number}
},{
    timestamps:true
})

const Transaction = model("Transactions", safaricomPayment)
module.exports = Transaction;