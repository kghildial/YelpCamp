var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('landing');
});

app.listen(process.env.PORT || 3000, process.env.IP, function(req, res){
  console.log("Server Started...");
});
