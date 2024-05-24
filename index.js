const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Payment } = require("./controllers/payment.controller");
const Transaction = require("./routes/payment.route");
const mongoose  = require("mongoose");
const { error } = require("console");
// const ngrok = require("@ngrok/ngrok");
dotenv.config()
const auth = process.env.NGROK_AUTHTOKEN;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors());

// app.get("/payment", Payment)
app.use("/pay", Transaction)
app.use("/callback", Transaction)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
// ngrok.connect(PORT).then(console.log("Connected to ngrok..."))
mongoose.connect("mongodb+srv://Admin:7668Tamera@safaricom-payment.1ui2ued.mongodb.net/?retryWrites=true&w=majority&appName=Safaricom-payment")
.then(()=>{
    console.log("Connected to the server successfuly")
})
.catch((error)=>{
    console.log(error.message)
})

