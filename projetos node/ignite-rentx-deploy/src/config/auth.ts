export default {
  jwt: {
    secret_token:
      process.env.SECRET ||
      '8e6d881a9fb9c1896fb03847f924a8b38791945130e619d3f88915c93462b670',
    expires_in_token: process.env.EXPIRE || '15min',
    secret_refresh_token:
      '6194ebcd6101f940ce9da58ae8dadb0634d8bd80874c4d1b947b7e85b6c93b7a',
    expires_in_refresh_token: '30d',
    expires_refresh_token_days: 30,
  },
};
