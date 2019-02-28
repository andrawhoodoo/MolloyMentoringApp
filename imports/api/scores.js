import { Mongo } from 'meteor/mongo';

export const Scores = new Mongo.Collection('Scores');


if(Meteor.isServer) {
	Meteor.publish('scoresData', function() {
		return Scores.find({});
	});
}

Meteor.methods({
	'addScore': function(mentor, mentee, score) {
		if(!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		Scores.insert({
			mentor: mentor,
      mentee: mentee,
      score: score
		})
	}
})
