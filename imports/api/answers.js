import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Options } from './options';

export const Answers = new Mongo.Collection('Answers');


if(Meteor.isServer){
    Meteor.publish('answersData', function(){
        return Answers.find({});
    });
}

Meteor.methods({
  'addAnswer': function(surveyId, questionid, selections) {
    Answers.update({
      userId: this.userId,
	  surveyId: surveyId,
      questionId: questionid
	}, {
      selections: selections
    });
  }
});
