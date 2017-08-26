var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('landing');
});

app.get('/campgrounds', function(req, res){
  var campgrounds = [
    {
      name: "Woods Camp",
      image: "https://images.pexels.com/photos/6714/light-forest-trees-morning.jpg?w=940&h=650&auto=compress&cs=tinysrgb"
    },
    {
      name: "Hills Camp",
      image: "https://images.pexels.com/photos/14287/pexels-photo-14287.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"
    },
    {
      name: "Desert Camp",
      image: "https://images.pexels.com/photos/260593/pexels-photo-260593.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"
    }
  ]

  res.render('campgrounds', {campgrounds: campgrounds});
});

app.listen(process.env.PORT || 3000, process.env.IP, function(req, res){
  console.log("Server Started...");
});
