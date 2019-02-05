import { Template } from 'meteor/templating';

import { Surveys } from '../api/surveys.js';

import { Answers } from '../api/answers.js';

import './getscore.html';

Template.body.events({
  'submit .get-score'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Assign variables from inputs
    const target = event.target;

    // Get Survey ID
    const surveyId = target.surveyId.value;
    // Get User IDs to compare
    const userId1 = target.userId1.value;
    const userId2 = target.userId2.value;
    // Load question list to array
    const questions = Surveys.findOne({_id:surveyId}).questions;

    // Create counter
    var counter = 0;

    // Loop for questions.length
    for (var ii=0; ii < questions.length; ii++) {
      //assign user selections to vars
      var a1 = Answers.findOne({$and:[{questionId:questions[ii]},{userId:userId1}]}).optionId;
      var a2 = Answers.findOne({$and:[{questionId:questions[ii]},{userId:userId2}]}).optionId;
      // Compare answer for specific question
      if (a1 == a2) { counter++; }
    };

    // Calculate score as decimal from 0-1
    const score = counter/questions.length;
    target.score.value = score;
  },
});
