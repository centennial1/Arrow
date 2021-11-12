// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the survey model
let survey = require('../models/surveys');
let surveys = require('../models/surveys');
let Survey = require('../models/surveys');

/* GET survey List page. READ */
router.get('/', (req, res, next) => {
  // find all sueveys in the surveys collection
  survey.find( (err, surveys) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('surveys/index', {
        title: 'Surveys',
        surveys: surveys
      });
    }
  });

});

//  GET the Surveys Details page in order to add a new Survey
router.get('/add', (req, res, next) => {

  res.render('surveys/details', {
    title: 'Add Survey', 
    surveys:'' });
});

// POST process the Survey Details page and create a new Survey - CREATE
router.post('/add', (req, res, next) => {

  let newSurvey = Survey({
    "Title": req.body.title,
    "Author":req.body.author,
    "StartDate": req.body.startDate,
    "EndDate": req.body.endDate     
    });


surveys.create(newSurvey, (err, Survey) =>{
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
        // refresh the surveys  
        res.redirect('/surveys');
    }
   });
});

// GET the Surveys Details page in order to edit an existing surveys
router.get('/:id', (req, res, next) => {

  let id = req.params.id;

  Survey.findById(id, (err, surveysToEdit) => {
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
        //show the edit view
        res.render('surveys/details', {
          title: 'Edit Survey', 
          surveys: surveysToEdit
        })
    }
});
});


// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  let id = req.params.id

     let updatedSurvey = Survey({
          "_id": id,
          "Title": req.body.title,
          "Author":req.body.author,
          "StartDate": req.body.startDate,
          "EndDate": req.body.endDate     
     });
 
     Survey.updateOne({_id: id}, updatedSurvey, {}, (err) => {
         if(err)
         {
             console.log(err);
             res.end(err);
         }
         else
         {
             // refresh the book list
             res.redirect('/surveys');
         }
     });
});



// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  let id = req.params.id;

  Survey.remove({_id: id}, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
           // refresh the survey list
           res.redirect('/surveys');
      }
  });
});


module.exports = router;


