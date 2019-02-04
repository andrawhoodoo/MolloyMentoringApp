import { Template } from 'meteor/templating';

import { Users } from '../api/users.js';

import { Questions } from '../api/questions.js';

import { Options } from '../api/questions.js';

import { Surveys } from '../api/surveys.js';

import './viewsurvey.html';


Template.body.events({
    'submit .view-survey'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Assign variables from inputs
    const target = event.target;

    const surveyId = target.surveyId.value;
    const surveyAdminId = Surveys.findOne({_id:surveyId}).surveyAdmin;
    const surveyAdminName = Users.findOne({_id:surveyAdminId}).name.first + " " + Users.findOne({_id:surveyAdminId}).name.last;

    // Question 1 variables
    // Q1 ID & Text
    const q1Id = Surveys.findOne({_id:surveyId}).questions[0];
    const q1Text = Questions.findOne({_id:q1Id}).text;
    // Q1: Opt1 - ID & Text
    const q1o1Id = Questions.findOne({_id:q1Id}).options[0];
    const q1o1Text = Options.findOne({_id:q1o1Id}).text;
    // Q1: Opt2 - ID & Text
    const q1o2Id = Questions.findOne({_id:q1Id}).options[1];
    const q1o2Text = Options.findOne({_id:q1o2Id}).text;
    // Q1: Opt3 - ID & Text
    const q1o3Id = Questions.findOne({_id:q1Id}).options[2];
    const q1o3Text = Options.findOne({_id:q1o3Id}).text;
    // Q4: Opt4 - ID & Text
    const q1o4Id = Questions.findOne({_id:q1Id}).options[3];
    const q1o4Text = Options.findOne({_id:q1o4Id}).text;

    // Fill text fields

    target.surveyAdminId.value = surveyAdminId;
    target.surveyAdminName.value = surveyAdminName;
    target.q1Id.value = q1Id;
    target.q1Text.value = q1Text;
    target.q1o1Id.value = q1o1Id;
    target.q1o1Text.value = q1o1Text;
    target.q1o2Id.value = q1o2Id;
    target.q1o2Text.value = q1o2Text;
    target.q1o3Id.value = q1o3Id;
    target.q1o3Text.value = q1o3Text;
    target.q1o4Id.value = q1o4Id;
    target.q1o4Text.value = q1o4Text;
  },
});
