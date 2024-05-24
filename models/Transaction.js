const { Schema, model } = require("mongoose");

const safaricomPayment = new Schema({
    orderRef:{type:String,required:true},
    phone:{type:Number,required:true},
    amount:{type:Number,required:true}
},{
    timestamps:true
})

const Transaction = model("Transactions", safaricomPayment)
module.exports = Transaction;