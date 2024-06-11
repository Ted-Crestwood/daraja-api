const handlePay = require("../utils/stkPush");

function Pay(){
    handlePay((status, message) => {
        console.log(`Status: ${status}, Message: ${message}`);
    })
}
module.exports = {Pay};