var express = require('express');
var router = express.Router();

var twilio = require('twilio');
var client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);



router.post('/send', async (req, res, next) => {
  let phoneNum = req.body.number
  let text = req.body.text

  try {
    client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      body: text,
      to: phoneNum
    })
      .then(message => {
        console.log(message)
        res.status(200).json({
          status: "success",
          message: 'Text Message Sent',
          payload: message
        })
      })
      .done();

  } catch (err) {
    console.log(err)
  }
})


module.exports = router;