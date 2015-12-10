/**
 * Created by HWhewell on 07/12/2015.
 */

// Create reference to express package
var express = require('express');
var app = express();

//specify which files can be accessed
app.use('/node_modules', express.static( __dirname + '/node_modules'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

// set up base directory for server
app.get('/', function(req, res, next){
    res.sendFile(__dirname + '/public/index.html');
});

// run server on port 3000
app.listen(3000, function(){
    console.log('Express Server Started');
});