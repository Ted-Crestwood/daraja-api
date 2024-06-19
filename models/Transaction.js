const { Schema, model } = require("mongoose");

const safaricomPayment = new Schema({
    // orderRef:{type:String,required:true},
    id:{type:Number},
    code:{type:Number},
    data:{type:Array}
},{
    timestamps:true
})

const Transaction = model("Transactions", safaricomPayment)
module.exports = Transaction;