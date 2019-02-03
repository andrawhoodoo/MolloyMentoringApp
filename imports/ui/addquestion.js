import { Template } from 'meteor/templating';

import { Questions } from '../api/questions.js';

import { Options } from '../api/questions.js';

import './addquestion.html';

Template.body.events({
  'submit .new-question'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Assign variables from inputs
    const target = event.target;

    const qText = target.qText.value;
    const opt1 = target.opt1.value;
    const opt2 = target.opt2.value;
    const opt3 = target.opt3.value;
    const opt4 = target.opt4.value;

    // Write document to MongoDB
    // Returns document's newly-created ID, if successful

    const opt1Id = Options.insert({
      text: opt1,
      createdAt: new Date(), // Adds timestamp
    });

    const opt2Id = Options.insert({
      text: opt2,
      createdAt: new Date(), // Adds timestamp
    });

    const opt3Id = Options.insert({
      text: opt3,
      createdAt: new Date(), // Adds timestamp
    });

    const opt4Id = Options.insert({
      text: opt4,
      createdAt: new Date(), // Adds timestamp
    });

    const questionId = Questions.insert({
      text: qText,
      options: [ opt1Id, opt2Id, opt3Id, opt4Id ],
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
    target.lastQuestionId.value = questionId;
    target.lastOptionIds.value = opt1Id + ", " + opt2Id + ", " + opt3Id + ", " + opt4Id;
  },
});
