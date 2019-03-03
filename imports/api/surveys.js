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
  	'addSurvey': function(title, author, questionIdArr) {
		const id = Surveys.insert({
			title: title,
			author: author,
			questions: questionIdArr
		});
		return id;
  	}
});
