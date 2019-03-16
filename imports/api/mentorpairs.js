import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import { Groups } from './groups';
import { Notifications } from './notifications';

export const MentorPairs = new Mongo.Collection('MentorPairs');

if(Meteor.isServer) {
	Meteor.publish('MentorPairsData', function() {
		return MentorPairs.find({});
	});
	Meteor.publish('myPairings', function() {
		return MentorPairs.find({$or: [{MentorId: this.userId}, {MenteeId: this.userId}]});
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
		Notifications.insert({
			userId: mentor,
			type: 'pairing',
			data: mentee
		});
		Notifications.insert({
			userId: mentee,
			type: 'pairing',
			data: mentor
		});
	}
});