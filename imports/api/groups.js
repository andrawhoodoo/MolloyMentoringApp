import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Groups = new Mongo.Collection('Groups');

if(Meteor.isServer) {
	Meteor.publish('groupsData', function() {
		return Groups.find({});
	});
}

Meteor.methods({
	'createGroup': function(groupName, mentorId, menteeId) {
		if(!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		Groups.insert({
			groupName: groupName,
			mentorId: mentorId,
			menteeId: menteeId,
			date: new Date()
		})
	}
})