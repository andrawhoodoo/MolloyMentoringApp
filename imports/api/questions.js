import { Mongo } from 'meteor/mongo';
import { Options } from './options';

export const Questions = new Mongo.Collection('Questions');

if(Meteor.isServer){
    Meteor.publish('questionsData', function(){
        return Questions.find({});
    });
}

Meteor.methods({
  'addQuestion': function(text, options, limit) {
    Questions.insert({
      text: text,
      options: options,
      limit: 1 //For future implementation: how many selections per question
    });
  }
});
