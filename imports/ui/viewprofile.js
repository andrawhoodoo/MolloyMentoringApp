import { Template } from 'meteor/templating';

import { Profiles } from '../api/profiles.js';

import './viewprofile.html';

Template.body.events({
    'submit .view-profile'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Assign variables from inputs
    const target = event.target;

    const userId = target.userId.value;

    const fName = Profiles.findOne({ _id:userId}).name.first;
    const lName = Profiles.findOne({_id:userId}).name.last;
    const street1 = Profiles.findOne({ _id:userId}).address.street1;
    const street2 = Profiles.findOne({ _id:userId}).address.street2;
    const city = Profiles.findOne({ _id:userId}).address.city;
    const state = Profiles.findOne({ _id:userId}).address.state;
    const zip = Profiles.findOne({ _id:userId}).address.zip;
    const dob = Profiles.findOne({ _id:userId}).dob;
    const email = Profiles.findOne({ _id:userId}).email;
    const gender = Profiles.findOne({ _id:userId}).gender;
    const pArea = Profiles.findOne({ _id:userId}).phone.area;
    const pPrefix = Profiles.findOne({ _id:userId}).phone.prefix;
    const pLine = Profiles.findOne({ _id:userId}).phone.line;

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
