require('dotenv').load()
var Stripe = require('stripe');

module.exports = function(){
    
    return{ stripe: Stripe(process.env.STRIPE_API_KEY) };
};


