import { Template } from 'meteor/templating';

import { Users } from '../api/users.js';

import { Questions } from '../api/questions.js';

import { Options } from '../api/questions.js';

import { Surveys } from '../api/surveys.js';

import { Answers } from '../api/answers.js';

import './takesurvey.html';


Template.body.events({
  // Using class attribute directly on button html to define function
  'click .load-survey'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Assign variables from inputs
    const target = event.target.form;

    const surveyId = target.surveyId.value;
    const userId = target.userId.value;

    // Load survey's question list array from DB, assign to var
    const surveyQuestions = Surveys.findOne({_id:surveyId}).questions;

    // TEMPORARY: obtain question # to answer
    const questionNumber = target.questionNumber.value -1; //-1 accounts for indexing vs natural language
    const questionTotal = surveyQuestions.length;

    // Load question info
    const questionId = surveyQuestions[questionNumber]; // Index of question number [todo: should be a var in a loop]
    const questionText = Questions.findOne({_id:questionId}).text;  // Question's text
    const questionOptions = Questions.findOne({_id:questionId}).options; // Question's options list

    // Dynamicly load question's options' info into variables
    // option[n]Id = option's ID, option[n]Text = option's text
    for (var ii=0; ii < questionOptions.length; ii++) {
      this["option" + (ii+1) + "Id"] = questionOptions[ii];
      this["option" + (ii+1) + "Text"] = Options.findOne({_id:this["option" + ( ii + 1 ) + "Id"]}).text;
    }

    // Fill text fields
    target.questionNumber.value = questionNumber+1;
    target.questionTotal.value = questionTotal;
    target.questionId.value = questionId;
    target.questionText.value = questionText;
    target.option1Id.value = this.option1Id;
    target.option1Text.value = this.option1Text;
    target.option2Id.value = this.option2Id;
    target.option2Text.value = this.option2Text;
    target.option3Id.value = this.option3Id;
    target.option3Text.value = this.option3Text;
    target.option4Id.value = this.option4Id;
    target.option4Text.value = this.option4Text;
  },

  'click .submit-answer'(event) {
    event.preventDefault();

    // Added ".form" since button's class/function doesn't pass form data
    const target = event.target.form;

    // User's selection
    const selection = target.selection.value -1; //-1 accounts for indexing

    const userId = target.userId.value;
    const surveyId = target.surveyId.value;
    const questionId = target.questionId.value;
    const optionId = Questions.findOne({_id:questionId}).options[selection];

    // Write document to MongoDB
    // Returns document's newly-created ID, if successful

    const answerId = Answers.insert({
      userId: userId,
      questionId: questionId,
      optionId: optionId,
      surveyId: surveyId,
      createdAt: new Date(), // Adds timestamp
    });
    alert('Success! New answer ID: ' + answerId);
  },
});
