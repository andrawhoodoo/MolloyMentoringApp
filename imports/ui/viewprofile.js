import { Template } from 'meteor/templating';

import { Users } from '../api/users.js';

import './viewprofile.html';

Template.body.events({
    'submit .view-user'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Assign variables from inputs
    const target = event.target;

    const userId = target.userId.value;

    const fName = Users.findOne({ _id:userId}).name.first;
    const lName = Users.findOne({_id:userId}).name.last;
    const street1 = Users.findOne({ _id:userId}).address.street1;
    const street2 = Users.findOne({ _id:userId}).address.street2;
    const city = Users.findOne({ _id:userId}).address.city;
    const state = Users.findOne({ _id:userId}).address.state;
    const zip = Users.findOne({ _id:userId}).address.zip;
    const dob = Users.findOne({ _id:userId}).dob;
    const email = Users.findOne({ _id:userId}).email;
    const gender = Users.findOne({ _id:userId}).gender;
    const pArea = Users.findOne({ _id:userId}).phone.area;
    const pPrefix = Users.findOne({ _id:userId}).phone.prefix;
    const pLine = Users.findOne({ _id:userId}).phone.line;

    // Fill text fields

    target.fName.value = fName;
    target.lName.value = lName;
    target.street1.value = street1;
    target.street2.value = street2;
    target.city.value = city;
    target.state.value = state;
    target.zip.value = zip;
    target.dob.value = dob;
    target.email.value = email;
    target.gender.value = gender;
    target.pArea.value = pArea;
    target.pPrefix.value = pPrefix;
    target.pLine.value = pLine;
  },
});
