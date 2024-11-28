const paypal = require('paypal-rest-sdk');

paypal.configure({
    mode : 'sandbox',
    client_id : "AfhfuURCuHlF9m3GiWbv_4cmu_PkBckepXAXfq5m8LKn-ykkEp3n9Az7THooztBxSadquH20RlNYC3Ft",
    client_secret: "EBXcQ5lo18rZKhZNKO8FOUM5tvqX8jW0yYLlygszIakqbYmEIatwyg8gXt-Oju4eI09xKU6lAQ4bks3e",
})

module.exports = paypal;