import { Mongo } from 'meteor/mongo';

export const MentorPairs = new Mongo.Collection('MentorPairs');


if(Meteor.isServer) {
	Meteor.publish('MentorPairsData', function() {
		return MentorPairsData.find({});
	});
}

Meteor.methods({
	'createPair': function(mentor) {
		if(!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		Groups.insert({
			name: groupName,
			surveyId: surveyId,
			mentors_pool: '',
			mentees_pool: '',
			pairs: ''
		})
	}
})
