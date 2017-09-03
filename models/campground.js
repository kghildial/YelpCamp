var mongoose = require('mongoose');

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  //Comments are an array of comment Ids
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Campground", campgroundSchema);
