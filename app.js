var express       = require('express'),
    app           = express(),
    bodyParser    = require('body-parser'),
    mongoose      = require('mongoose'),
    Campground    = require("./models/campground"),
    seedDB        = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

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
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc};
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
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    }
    else{
      res.render('show', {campground: foundCampground});
    }
  });
});

app.listen(process.env.PORT || 3000, process.env.IP, function(req, res){
  console.log("Server Started...");
});
