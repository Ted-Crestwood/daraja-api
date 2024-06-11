
let unirest = require('unirest');

const callbackUrl = "https://d3fb-197-232-85-124.ngrok-free.app/callbackurl";
function handlePay() {
    let req = unirest('POST', 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest')
        .headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer MiPHAE5KwgVY65ZPBvSElkfKAlw5'
        })
        .send(JSON.stringify({
            "BusinessShortCode": 174379,
            "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwNjExMTYwNTM2",
            "Timestamp": "20240611160536",
            "TransactionType": "CustomerPayBillOnline",
            "Amount": 1,
            "PartyA": 254707894405,
            "PartyB": 174379,
            "PhoneNumber": 254707894405,
            "CallBackURL": callbackUrl,
            "AccountReference": "CompanyXLTD",
            "TransactionDesc": "Payment of X"
        }))
        .end(res => {
            if (res.error) throw new Error(res.error);
            console.log(res.raw_body);
        });
}
module.exports = handlePay;