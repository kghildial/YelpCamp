var mongoose  = require('mongoose');
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
  {
    name: "Woods Camp",
    image: "https://images.pexels.com/photos/6714/light-forest-trees-morning.jpg?w=940&h=650&auto=compress&cs=tinysrgb",
    description: "Great woods camp!!!"
  },
  {
    name: "Hills Camp",
    image: "https://images.pexels.com/photos/14287/pexels-photo-14287.jpeg?h=350&auto=compress&cs=tinysrgb",
    description: "Description!!!"
  },
  {
    name: "Desert Camp",
    image: "https://images.pexels.com/photos/260593/pexels-photo-260593.jpeg?h=350&auto=compress&cs=tinysrgb",
    description: "Desert Camp!!!"
  }
]

function seedDB(){
  //Remove all campgrounds
  Campground.remove({}, function(err){
    if(err){
      console.log(err);
    }
    console.log("removed campgrounds!!!");
  });
  //Add a few campgrounds
  data.forEach(function(seed){
    Campground.create(seed, function(err, campground){
      if(err){
        console.log(err);
      }
      else{
        console.log("Added a Campground!");
      }
    });
  });
  //Add a few comments
  Comment.create(
    {
      text: "Great Camping Experience!",
      author: "Admin"
    }, function(err, comment){
      if(err){
        console.log(err);
      }
      else{
        campground.comments.push(comment);
        campground.save();
        console.log("Created new Comment!");
      }
    });
}

module.exports = seedDB;
