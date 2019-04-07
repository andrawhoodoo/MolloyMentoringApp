import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Questions } from './questions';
import { Options } from './options';

export const Surveys = new Mongo.Collection('Surveys');

if(Meteor.isServer){
    Meteor.publish('surveysData', function(){
        return Surveys.find({});
    });
}

Meteor.methods({
  	'addSurvey': function(questionIdArr) {
		const id = Surveys.insert({
			author: this.userId,
			questions: questionIdArr
		});
		console.log(questionIdArr);
		return id
  	}
});
