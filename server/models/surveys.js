let mongoose = require('mongoose');

// create a model class
let Survey = mongoose.Schema({
    Title: String,
    Author: String,
    StartDate: String,
    EndDate: String
},
{
  collection: "surveys"
});

module.exports = mongoose.model('survey', Survey);


 