import { Template } from 'meteor/templating';

import { Users } from '../api/users.js';

import './adduser.html';

Template.body.events({
  'submit .new-user'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Assign variables from inputs
    const target = event.target;

    const fName = target.fName.value;
    const lName = target.lName.value;
    const street1 = target.street1.value;
    const street2 = target.street2.value;
    const city = target.city.value;
    const state = target.state.value;
    const zip = target.zip.value;
    const dob = target.dob.value;
    const email = target.email.value;
    const gender = target.gender.value;
    const pArea = target.pArea.value;
    const pPrefix = target.pPrefix.value;
    const pLine = target.pLine.value;

    // Write document to MongoDB
    // Returns document's newly-created ID, if successful

    const newId = Users.insert({
      name:{
      	first: fName,
      	last: lName
      },
      address:{
      	street1: street1,
      	street2: street2,
      	city: city,
      	state: state,
      	zip: zip
      },
      dob: dob,
      email: email,
      gender: gender,
      phone:{
      	area: pArea,
      	prefix: pPrefix,
      	line: pLine
      },
      // Additional fields can be inserted here
      createdAt: new Date(), // Adds timestamp
  });

    // Provide feedback
    alert("Success! Added User ID: " + newId);

    // Clear form
    var elements = document.getElementsByTagName("input");
    for (var ii=0; ii < elements.length; ii++) {
      if (elements[ii].type == "text") {
        elements[ii].value = "";
      }
    }

    // For debugging: easy copy/paste of last ID created
    target.lastId.value = newId;
  },
});
