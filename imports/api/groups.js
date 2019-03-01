import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Groups = new Mongo.Collection('Groups');

if(Meteor.isServer) {
	Meteor.publish('groupsData', function() {
		return Groups.find({});
	});
	Meteor.publish('createdGroupsData', function(id) {
		return Groups.find({adminId: id});
	});
}

Meteor.methods({
	'createGroup': function(groupName, surveyId, description) {
		if(!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		console.log(groupName, "my inputs");
		Groups.insert({
			name: groupName,
			surveyId: surveyId,
			description: description,
			mentors_pool: '',
			mentees_pool: '',
			pairs: '',
			adminId: this.userId
		});
	}
})
