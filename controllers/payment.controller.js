const { default: axios } = require('axios');
const { timeStamp } = require('console');
const ngrok = require('ngrok');
let unirest = require('unirest');
const Transaction = require('../models/Transaction');
const getTimestamp = require('../utils/timestamp');



const getAccessToken = async () => {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    try {
        const response = await unirest.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials")
            .headers({
                'Authorization': `Basic ${auth}`
            });
        const accessToken = response.body.access_token
        if (accessToken) {
            return accessToken;
        } else {
            throw new Error('Unable to fetch access token');
        }
    } catch (error) {
        console.error('Error fetching access token:', error);
        throw error;
    }
};

const safaricomTransaction = async (req, res) => {
    try {
        const {amount,phone,orderRef} = req.body;
        console.log("transac", phone)
        const accessToken = await getAccessToken();
        const callback_url = await ngrok.connect(process.env.PORT);
        const api = ngrok.getApi();
        await api.listTunnels()
        const response = await unirest.post(process.env.SAFARICOM_API)
            .headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            })
            .send({
                BusinessShortCode: process.env.MPESA_BUSINESS_SHORT_CODE,
                Password: process.env.PASSWORD,
                Timestamp: getTimestamp,
                TransactionType: "CustomerPayBillOnline",
                Amount: amount,
                PartyA: phone,
                PartyB: process.env.MPESA_BUSINESS_SHORT_CODE,
                PhoneNumber: phone,
                CallBackURL: `${callback_url}/callback/${orderRef}`,
                AccountReference: "Crestwood",
                TransactionDesc: "Paid online",
            });
        const status = response.body.ResponseCode;

        await Transaction.create({ amount, phone, orderRef });
        if(status === "0"){
            res.status(200).json({
                data: response.body,
                message:"Processing transaction..."
            })
           }else{
            res.status(201).json({
                message:"Transaction completed successfuly"
            })
           }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



const handleCallback = async (req,res) => {
    const data = req.body;
    console.log("data :", data)
};


module.exports = {  safaricomTransaction ,handleCallback};



// const body ={
//     "BusinessShortCode": 174379,
//     "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwNTIzMTUzMDMw",
//     "Timestamp": "20240523153030",
//     "TransactionType": "CustomerPayBillOnline",
//     "Amount": 8,
//     "PartyA": 254707894405,
//     "PartyB": 174379,
//     "PhoneNumber": 254707894405,
//     "CallBackURL": "https://crestwood.co.ke/path",
//     "AccountReference": "Crestwood",
//     "TransactionDesc": "Transaction"
// }