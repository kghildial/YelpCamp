var mongoose  = require('mongoose');
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "Woods Camp",
    image: "https://images.pexels.com/photos/6714/light-forest-trees-morning.jpg?w=940&h=650&auto=compress&cs=tinysrgb",
    description: "Vestibulum ante dui, euismod in nibh et, sodales cursus dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus interdum risus sed dui facilisis malesuada. Praesent a facilisis metus. Nam quis bibendum nisl. Sed sed dui laoreet, lobortis lectus vitae, fringilla libero. Donec a tristique ante, eget viverra ipsum. Maecenas ligula tortor, lobortis et faucibus sit amet, malesuada et tellus. Vestibulum ornare vitae purus ut auctor. Fusce ullamcorper, velit in elementum bibendum, tellus dolor fermentum felis, ut malesuada risus massa vitae ligula. Fusce vestibulum mi diam, non pretium erat interdum nec. Mauris eu massa lobortis, sodales mi nec, mollis diam. Morbi fringilla leo vel purus dapibus molestie. Ut ultrices, neque vel fringilla iaculis, erat ex molestie mauris, eu varius dui velit sit amet neque. Phasellus at orci nec ipsum bibendum malesuada."
  },
  {
    name: "Hills Camp",
    image: "https://images.pexels.com/photos/14287/pexels-photo-14287.jpeg?h=350&auto=compress&cs=tinysrgb",
    description: "Vestibulum ante dui, euismod in nibh et, sodales cursus dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus interdum risus sed dui facilisis malesuada. Praesent a facilisis metus. Nam quis bibendum nisl. Sed sed dui laoreet, lobortis lectus vitae, fringilla libero. Donec a tristique ante, eget viverra ipsum. Maecenas ligula tortor, lobortis et faucibus sit amet, malesuada et tellus. Vestibulum ornare vitae purus ut auctor. Fusce ullamcorper, velit in elementum bibendum, tellus dolor fermentum felis, ut malesuada risus massa vitae ligula. Fusce vestibulum mi diam, non pretium erat interdum nec. Mauris eu massa lobortis, sodales mi nec, mollis diam. Morbi fringilla leo vel purus dapibus molestie. Ut ultrices, neque vel fringilla iaculis, erat ex molestie mauris, eu varius dui velit sit amet neque. Phasellus at orci nec ipsum bibendum malesuada."
  },
  {
    name: "Desert Camp",
    image: "https://images.pexels.com/photos/260593/pexels-photo-260593.jpeg?h=350&auto=compress&cs=tinysrgb",
    description: "Vestibulum ante dui, euismod in nibh et, sodales cursus dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus interdum risus sed dui facilisis malesuada. Praesent a facilisis metus. Nam quis bibendum nisl. Sed sed dui laoreet, lobortis lectus vitae, fringilla libero. Donec a tristique ante, eget viverra ipsum. Maecenas ligula tortor, lobortis et faucibus sit amet, malesuada et tellus. Vestibulum ornare vitae purus ut auctor. Fusce ullamcorper, velit in elementum bibendum, tellus dolor fermentum felis, ut malesuada risus massa vitae ligula. Fusce vestibulum mi diam, non pretium erat interdum nec. Mauris eu massa lobortis, sodales mi nec, mollis diam. Morbi fringilla leo vel purus dapibus molestie. Ut ultrices, neque vel fringilla iaculis, erat ex molestie mauris, eu varius dui velit sit amet neque. Phasellus at orci nec ipsum bibendum malesuada."
  }
]

function seedDB(){
  //Remove all campgrounds
  Campground.remove({}, function(err){
    if(err){
      console.log(err);
    }
    console.log("removed campgrounds!!!");
    //Add a few campgrounds
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
        if(err){
          console.log(err);
        }
        else{
          console.log("Added a Campground!");
        }
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
      });
    });
  });
}

module.exports = seedDB;
