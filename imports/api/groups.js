import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Groups = new Mongo.Collection('Groups');

if(Meteor.isServer) {
	Meteor.publish('groupsData', function() {
		return Groups.find({});
	});
}

Meteor.methods({
	'createGroup': function(groupName, surveyId) {
		if(!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		Groups.insert({
			name: groupName,
			surveyId: surveyId
		})
	}
})