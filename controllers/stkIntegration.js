const axios = require('axios');
const unirest = require('unirest');
const Transaction = require('../models/Transaction');

const date = new Date();
const timestamp =
  date.getFullYear() +
  ("0" + (date.getMonth() + 1)).slice(-2) +
  ("0" + date.getDate()).slice(-2) +
  ("0" + date.getHours()).slice(-2) +
  ("0" + date.getMinutes()).slice(-2) +
  ("0" + date.getSeconds()).slice(-2);
const shortCode = 174379; //sandbox -174379
const passkey = "YOUR_PASSKEY";
const callback = process.env.CALL_BACK_URL

const stk_password = "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwNjE4MDkyMjI0";
const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

async function sendStkPush(req, res) {
  const {phone,amount} = req.body;
  unirest.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest')
  .headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ttNcwM5kQm12VEySrQ3ODpsFjkeC'
  })
  .send(JSON.stringify({
      "BusinessShortCode": 174379,
      "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwNjE5MTEyOTEw",
      "Timestamp": "20240619112910",
      "TransactionType": "CustomerPayBillOnline",
      "Amount": amount,
      "PartyA": phone,
      "PartyB": 174379,
      "PhoneNumber": phone,
      "CallBackURL": "https://crestwood-daraja-api.onrender.com/callbackurl",
      "AccountReference": "Crestwood.co.ke",
      "TransactionDesc": "First pay" 
    }))
  .end(res => {
    if (res.error){
      throw new Error(res.error)
    }else{
       Transaction.create({phone:phone,amount:amount,code:res.raw_body.ResponseCode})
      return res.raw_bod;
    }
    console.log(res.raw_body);
  });
}
module.exports = { sendStkPush }