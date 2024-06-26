
let unirest = require('unirest');
let resCode = null;
const callbackUrl = "https://crestwood-daraja-api.onrender.com/mpesa/callback";
const url = process.env.CALL_BACK_URL
//"http://localhost:5000/mpesa/callback"

function handlePay() {
    let req = unirest('POST', 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest')
        .headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer MrZ0xKarITOBk5cP5YIDJ0PXa1KX'
        })
        .send(JSON.stringify({
            "BusinessShortCode": 174379,
            "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwNjE5MTAxNTEy",
            "Timestamp": "20240618092224",
            "TransactionType": "CustomerPayBillOnline",
            "Amount": 1,
            "PartyA": 254707894405,
            "PartyB": 174379,
            "PhoneNumber": 254707894405,
            "CallBackURL": url,
            "AccountReference": "CompanyXLTD",
            "TransactionDesc": "Payment of X"
        }))
        .end((res) => {
            const resData = res.body;
            resCode = resData;
            console.log(resData)
            console.log("code:", resCode.ResponseCode)
            // return resData;
        })
}
module.exports = { handlePay };
// .end(res => {
//     if (res.error) throw new Error(res.error);
//     console.log(res.raw_body);
// });