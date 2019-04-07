import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Notifications = new Mongo.Collection('Notifications');

if(Meteor.isServer) {
	Meteor.publish('notificationsData', function() {
		return Notifications.find({userId: this.userId});
	});
}

Meteor.methods({
	'deleteNotification': function(id) {
		const removeComplete = Notifications.remove({_id: id});
		return removeComplete;
	}
})