import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Notifications = new Mongo.Collection('Notifications');

if(Meteor.isServer) {
	Meteor.publish('notificationsData', function() {
		return Notifications.find({userId: this.userId});
	});
}