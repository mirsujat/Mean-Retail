/*jshint node:true*/
'use strict';

var debug = require('debug')('my-application');
var app = require('./app');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {  
    
    console.log('Server Listening on Port: 3000' );
    
    debug('Express server listening on port ' + server.address().port);
      
});