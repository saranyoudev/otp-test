export default () => ({
  smsProvider: {
    path: 'https://rest.clicksend.com/v3/sms/send',
    username: process.env.CLICKSEND_USERNAME || '',
    password: process.env.CLICKSEND_PASSWORD || '',
  },
});
