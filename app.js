var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send("Landing Page");
});

app.listen(process.env.PORT || 3000, process.env.IP, function(req, res){
  console.log("Server Started...");
});
