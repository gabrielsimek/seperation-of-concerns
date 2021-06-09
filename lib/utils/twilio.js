// import twilio from 'twilio';
const twilio = require('twilio');

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendSms = (message) => {
  return twilioClient.messages.create({
    body: message,
    from: process.env.TWILIO_NUMBER,
    to: process.env.ORDER_HANDLER_NUMBER,
  });
};

module.exports = {
  sendSms,
};
