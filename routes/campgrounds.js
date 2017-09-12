var express = require("express");
var Campground = require("../models/campground");

var router = express.Router({mergeParams: true});

//index route: campgrounds page
router.get('/', function(req, res){
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    }
    else{
      res.render('campgrounds/index', {campgrounds: allCampgrounds});
    }
  });
});

//create route: campgrounds page with added campground
router.post('/', function(req, res){
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
router.get('/new', function(req, res){
  res.render('campgrounds/new');
});

//show route: show info about selected campground
router.get('/:id', function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    }
    else{
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });
});

module.exports = router;