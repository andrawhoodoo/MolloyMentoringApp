import { Mongo } from 'meteor/mongo';

import { Groups } from './groups';

export const MentorPairs = new Mongo.Collection('MentorPairs');

if(Meteor.isServer) {
	Meteor.publish('MentorPairsData', function() {
		return MentorPairsData.find({});
	});
}

Meteor.methods({
	'createPair': function(mentor, mentee, groupId) {
		if(!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		const pairs = Groups.find({_id: groupId}).pairs;
		const addedPair = pairs.push([mentor, mentee]);
		Groups.update({
				_id: groupId
			}, {
				$set: {
					pairs: addedPair
				},
				$pull: {
					mentors_pool: mentor,
					mentees_pool: mentee
				}	
			}
		);
		MentorPairs.insert({
			MentorId: mentor,
			MenteeId: mentee
		});
	}
});