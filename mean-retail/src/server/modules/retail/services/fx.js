require('dotenv').load()
var superagent = require('superagent');
var _ = require('underscore');

module.exports = function(Config){
    var url = 'http://openexchangerates.org/api/latest.json?app_id=' + process.env.OPEN_EXCHANGE_RATES_KEY;
    var rates = {
        USD: 1,
        EUR: 1.1,
        GBP: 1.2
    };
    var ping = function(callback){
        superagent.get(url, function(error, res){
            if(error){
                if(callback){
                    callback(error)
                }
                return;
            }
            var results;
            try{
                var results = JSON.parse(res.text);
                _.each(results.rates || {}, function(value, key){
                    rates[key] = value;
                } );
                if(callback){
                    callback(null, rates);
                }
            }catch(e){
                if(callback){
                    callback(e);
                }
            }
        } );
    };
    
    setInterval(ping, 60 * 60 * 1000);
    var ret = function(){
        return rates;
    };
    ret.ping = ping;
    return ret;
};
