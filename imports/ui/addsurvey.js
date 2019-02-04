import { Template } from 'meteor/templating';

import { Surveys } from '../api/surveys.js';

import './addsurvey.html';

Template.body.events({
  'submit .new-survey'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Assign variables from inputs
    const target = event.target;

    const surveyAdmin = target.surveyAdmin.value;
    const q1 = target.q1.value;
    const q2 = target.q2.value;
    const q3 = target.q3.value;
    const q4 = target.q4.value;
    const q5 = target.q5.value;
    const q6 = target.q6.value;
    const q7 = target.q7.value;
    const q8 = target.q8.value;
    const q9 = target.q9.value;
    const q10 = target.q10.value;

    // Write document to MongoDB
    // Returns document's newly-created ID, if successful

    const surveyId = Surveys.insert({
      surveyAdmin: surveyAdmin,
      questions: [ q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 ],
      createdAt: new Date(), // Adds timestamp
    });

    // Provide feedback
    alert("Success!");

    // Clear form
    var elements = document.getElementsByTagName("input");
    for (var ii=0; ii < elements.length; ii++) {
      if (elements[ii].type == "text") {
        elements[ii].value = "";
      }
    }

    // For debugging: easy copy/paste of last IDs created
    target.lastSurveyId.value = surveyId;
  },
});
