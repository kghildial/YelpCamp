var express       = require('express'),
    app           = express(),
    bodyParser    = require('body-parser'),
    mongoose      = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//Schema setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Hills Camp",
//     image: "https://images.pexels.com/photos/14287/pexels-photo-14287.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
//     description: "This is a great campground with a beautiful hillside view."
//   }, function(err, campground){
//     if(err){
//       console.log(err);
//     }
//     else{
//       console.log("Newly created campground:")
//       console.log(campground);
//     }
//   });

//landing page
app.get('/', function(req, res){
  res.render('landing');
});

//index route: campgrounds page
app.get('/campgrounds', function(req, res){
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    }
    else{
      res.render('index', {campgrounds: allCampgrounds});
    }
  });
});

//create route: campgrounds page with added campground
app.post('/campgrounds', function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  //create a new campground & save to DB
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    }
    else{
      res.redirect('/campgrounds'); //default redirect as a get request
    }
  })
});

//new route: new campground form page
app.get('/campgrounds/new', function(req, res){
  res.render('new');
});

//show route: show info about selected campground
app.get('/campgrounds/:id', function(req, res){
  Campground.FindByID(req.params.id function(err, foundCampground){
    if(err){
      console.log(err);
    }
    else{
      res.render('show', {campground: foundCampground});
    }
});
