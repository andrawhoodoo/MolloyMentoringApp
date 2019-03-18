import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const ChatMessages = new Mongo.Collection('ChatMessages');

if(Meteor.isServer) {
	Meteor.publish('Conversations', function(mentorPairId) {
		return ChatMessages.find({mentorPairId: mentorPairId}, { sort: { createdAt: 1 } });
	})
}

Meteor.methods({
	'insertMessage': function(mentorPairId, username, message) {
		ChatMessages.insert({
			mentorPairId: mentorPairId,
			username: username,
			message: message,
			createdAt: new Date()
		});
	}
});