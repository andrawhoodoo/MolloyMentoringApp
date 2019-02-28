import { Mongo } from 'meteor/mongo';
import { Questions } from './questions';
import { Options } from './options';
import shortid from 'shortid';

export const Surveys = new Mongo.Collection('Surveys');

if(Meteor.isServer){
    Meteor.publish('surveysData', function(){
        return Surveys.find({});
    });
}

Meteor.methods({
  	'addSurvey': function(title, author, questions) {
		const newId = shortid.generate();
		Surveys.insert({
			_id: newId,
		  	title: title,
		  	author: author,
		  	questions: questions,
		});
	 	console.log(newId);
  	}
});
