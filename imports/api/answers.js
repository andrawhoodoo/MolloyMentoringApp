import { Mongo } from 'meteor/mongo';
import { Options } from './options';

export const Answers = new Mongo.Collection('Answers');


if(Meteor.isServer){
    Meteor.publish('answersData', function(){
        return Answers.find({});
    });
}

Meteor.methods({
  'addAnswer': function(userid, questionid, selections) {
    Answers.insert({
      userId: userid,
      questionId: questionid,
      selections: selections
    });
  }
});
