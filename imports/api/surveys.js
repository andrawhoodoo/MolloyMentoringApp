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
  	'addSurvey': function(title, questionIdArr) {
		const id = Surveys.insert({
			title: title,
			author: this.userIs,
			questions: questionIdArr
		});
		console.log(questionIdArr);
		return id
  	}
});
