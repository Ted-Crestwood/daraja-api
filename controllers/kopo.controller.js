const StkService = K2.StkService

let stkOptions = {
  paymentChannel: "M-PESA STK Push",
  tillNumber: "K000000",
  firstName: 'Jane',
  lastName: 'Doe',
  phoneNumber: '+254999999999',
  email: 'example@example.com',
  currency: 'KES',
  // A maximum of 5 key value pairs
  metadata: {
    customerId: '123456789',
    reference: '123456',
    notes: 'Payment for invoice 123456'
  },
    // This is where once the request is completed kopokopo will post the response
    callbackUrl: 'https://callback_to_your_app.your_application.com/endpoint',
    accessToken: 'myRand0mAcc3ssT0k3n'
}

StkService
  .initiateIncomingPayment(stkOptions)
  .then( response => {     
    console.log(response)
    // => 'https://sandbox.kopokopo.com/api/v1/incoming_payments/247b1bd8-f5a0-4b71-a898-f62f67b8ae1c'
  })
  .catch( error => {
    console.log(error)
  })
