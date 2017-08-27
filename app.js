var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//landing page
app.get('/', function(req, res){
  res.render('landing');
});

//campgrounds page
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

//campgrounds post route
app.post('/campgrounds', function(req, res){
  res.send("You hit the post route!");
});

app.listen(process.env.PORT || 3000, process.env.IP, function(req, res){
  console.log("Server Started...");
});
