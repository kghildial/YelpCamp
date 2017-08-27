var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

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
  },
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

//landing page
app.get('/', function(req, res){
  res.render('landing');
});

//campgrounds page
app.get('/campgrounds', function(req, res){
  res.render('campgrounds', {campgrounds: campgrounds});
});

//campgrounds page with added campground
app.post('/campgrounds', function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  campgrounds.push(newCampground);
  res.redirect('/campgrounds'); //default redirect as a get request
});

//new campground form page
app.get('/campgrounds/new', function(req, res){
  res.render('new');
});

app.listen(process.env.PORT || 3000, process.env.IP, function(req, res){
  console.log("Server Started...");
});
