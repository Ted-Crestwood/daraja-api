const axios = require('axios');

async function sendStkPush() {
//   const token = await generateToken();
  const date = new Date();
  const timestamp =
  date.getFullYear() +
  ("0" + (date.getMonth() + 1)).slice(-2) +
  ("0" + date.getDate()).slice(-2) +
  ("0" + date.getHours()).slice(-2) +
  ("0" + date.getMinutes()).slice(-2) +
  ("0" + date.getSeconds()).slice(-2);

  //you can use momentjs to generate the same in one line 

  const shortCode = 174379; //sandbox -174379
  const passkey = "YOUR_PASSKEY";
  

  const stk_password = "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwNjE4MDkyMjI0";

  //choose one depending on you development environment
  const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
//   const url = "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",

  const headers ={
	'Content-Type': 'application/json',
	'Authorization': 'Bearer WbH9LFTakzr36a2u1glLQ8r8v9lF'
};

  const requestBody = {
    "BusinessShortCode": 174379,
    "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwNjE4MTAyMTM4",
    "Timestamp": "20240618102138",
    "TransactionType": "CustomerPayBillOnline",
    "Amount": 1,
    "PartyA": 254707894405,
    "PartyB": 174379,
    "PhoneNumber": 254707894405,
    "CallBackURL": "https://01d6-197-232-85-124.ngrok-free.app/callbackurl",
    "AccountReference": "Crestwood.co.ke",
    "TransactionDesc": "Payment of X" 
  };

  try {
    const response = await axios.post(url, requestBody, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
module.exports = {sendStkPush}