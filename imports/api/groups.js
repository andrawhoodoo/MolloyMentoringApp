import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Surveys } from './surveys';

export const Groups = new Mongo.Collection('Groups');

if(Meteor.isServer) {
	Meteor.publish('groupsData', function() {
		return Groups.find({});
	});
}

Meteor.methods({
	'createGroup': function(groupName, surveyId, description) {
		if(!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		Groups.insert({
			name: groupName,
			surveyId: surveyId,
			description: description,
			mentors_pool: '',
			mentees_pool: '',
			pairs: ''
		})
	}
})
