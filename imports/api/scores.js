import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Scores = new Mongo.Collection('Scores');


if(Meteor.isServer) {
	Meteor.publish('scoresData', function() {
		return Scores.find({});
	});
}

Meteor.methods({
	'addScore': function(mentor, mentee, surveyId, score) {
		if(!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		Scores.update({
			mentor: mentor,
      		mentee: mentee,
			surveyId: surveyId
		}, {
      		$set: {score: score}
		}, {
			upsert: true
		});
	}
});
