const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const dotenv = require("dotenv");
const Payment = require("./routes/payment.route");
const callback = require("./routes/payment.route");

const mongoose  = require("mongoose");
const  Pay  = require("./routes/pay.route");
const handlePay = require("./utils/stkPush");
const  paymentPush  = require("./controllers/stk.controller");


dotenv.config()
const string = process.env.MONGO_DB_STRING;

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());

app.use(express.json())
app.use(cors());

app.use("/pay", handlePay)
app.use("/callbackurl", paymentPush)
// app.use("/url", callback)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
mongoose.connect(string)
.then(()=>{
    console.log("Connected to the server successfuly")
})
.catch((error)=>{
    console.log(error.message)
})

