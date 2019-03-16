import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Options = new Mongo.Collection('Options');

if(Meteor.isServer){
    Meteor.publish('optionsData', function(){
        return Options.find({});
    });
}

Meteor.methods({
  'addOption': function(text) {
    const id = Options.insert({
      text: text
    });
	return id;
  }
});
