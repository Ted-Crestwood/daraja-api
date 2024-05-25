const { default: axios } = require('axios');
const { timeStamp } = require('console');
let unirest = require('unirest');
const Transaction = require('../models/Transaction');



const safaricomTransaction = async (req, res) => {
    const payment = req.body;
    try {
        const accessToken = await getAccessToken();
        const response = await unirest.post(process.env.SAFARICOM_API)
            .headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            })
            .send({
                BusinessShortCode: process.env.MPESA_BUSINESS_SHORT_CODE,
                Password: process.env.PASSWORD,
                Timestamp: payment.Timestamp,
                TransactionType: payment.TransactionType,
                Amount: payment.Amount,
                PartyA: payment.PartyA,
                PartyB: payment.PartyB,
                PhoneNumber: payment.PhoneNumber,
                CallBackURL: "https://crestwood-daraja-api.onrender.com/callback",
                AccountReference: payment.AccountReference,
                TransactionDesc: payment.TransactionDesc,
                orderRef: payment.orderRef
            });
        const status = response.body.ResponseCode;

        if (payment) {
            await Transaction.create({ amount: payment.Amount, phone: payment.PartyA, orderRef: payment.orderRef });
            console.log("Transaction recorded in the database");
           if(status === "0"){
            res.status(200).json({
                message:"Processing transaction..."
            })
           }else{
            res.status(201).json({
                message:"Transaction completed successfuly"
            })
           }
        } else {
            res.status(400).json({
                message: 'Some of your details are missing'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

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


const handleCallback = async (req, res) => {
    const callbackData = req.body;
    console.log("callback :",callbackData)
    // try {
    //     console.log("Callback data received:", callbackData);

    //     const resultCode = callbackData.Body.stkCallback.ResultCode;
    //     const resultDesc = callbackData.Body.stkCallback.ResultDesc;

    //     if (resultCode === 0) {
    //         const callbackMetadata = callbackData.Body.stkCallback.CallbackMetadata.Item;
    //         const amount = callbackMetadata.find(item => item.Name === 'Amount').Value;
    //         const mpesaReceiptNumber = callbackMetadata.find(item => item.Name === 'MpesaReceiptNumber').Value;
    //         const transactionDate = callbackMetadata.find(item => item.Name === 'TransactionDate').Value;
    //         const phoneNumber = callbackMetadata.find(item => item.Name === 'PhoneNumber').Value;
    //         const orderRef = callbackData.Body.stkCallback.CheckoutRequestID;

    //         // Update the transaction status in the database
    //         await Transaction.updateOne(
    //             { orderRef: orderRef },
    //             { status: 'completed', mpesaReceiptNumber, transactionDate }
    //         );

    //         console.log("Transaction status updated in the database");

    //         res.status(200).json({
    //             message: 'Payment successful',
    //             data: {
    //                 amount,
    //                 mpesaReceiptNumber,
    //                 transactionDate,
    //                 phoneNumber
    //             }
    //         });
    //     } else {
    //         console.log("Payment failed:", resultDesc);
    //         res.status(400).json({
    //             message: 'Payment failed',
    //             data: resultDesc
    //         });
    //     }
    // } catch (error) {
    //     // Log the error
    //     console.error("Error handling callback:", error);

    //     // Send error response to the client
    //     res.status(500).json({
    //         message: error.message
    //     });
    // }
};



// const safaricomTransaction = async(req, res) => {
//     try {
//         unirest.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest")
//         res.writeHead(200,{
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer tFBlBqNL0F1JGxBCK4YihpU9WGWE'
//         })
//         const payment = req.body;
//         if (payment) {
//             res.status(200).json({
//                 message:'Processing transaction...'
//             })
//             res.status(201).json({
//                 message:'Transaction completed'
//             })

//             await Transaction.create(payment)
//             .then(console.log("Transaction recorded in the database"))
//             // res.send(payment)
//         }else{
//             res.status(204).json({
//                 message:'Some of your details are missing'
//             })
//         }

//     } catch (error) {
//         res.status(500).json({
//             message:error.message
//         })
//     }
// }



// async function Payment(req, res) {
//     const body = req.body;
//     req = unirest('POST', 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest')
//         .headers({
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer tFBlBqNL0F1JGxBCK4YihpU9WGWE'
//         })
//         .send(JSON.stringify({ body }))
//         .end(res => {
//             if (res.error) throw new Error(res.error);
//             console.log(res.raw_body);
//         });
// }

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