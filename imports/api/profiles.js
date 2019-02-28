import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Profiles = new Mongo.Collection('Profiles');


if(Meteor.isServer){
    Meteor.publish('profileData', function(){
        return Profiles.find({ _id: this.userId });
    });
}

Meteor.methods({
    'createProfile': function(fName, lName){
        if(!this.userId) {
			    throw new Meteor.Error('not-authorized');
		    }
		    Profiles.insert({
			  // Assign _id to be identical to the new Account userId, add email & name
			  _id: this.userId,
			  name:{
			    first: fName,
			    last: lName
		  	}
	    });
    },

  	'updateAddress': function(addressObj) {
	  	if(!this.userId) {
	  		throw new Meteor.Error('not-authorized');
	  	}
		  Profiles.update({
		  	_id: this.userId
	  	}, {
	  		$set: {address: addressObj}
	  	});
	  },

  	'unsetAddress': function() {
  		if(!this.userId) {
  			throw new Meteor.Error('not-authorized');
  		}
  		Profiles.update({
  			_id: this.userId
  		}, {
  			$unset: {address: ''}
  		});
  	},

    'updatePhone': function(phoneObj) {
	  	if(!this.userId) {
		  	throw new Meteor.Error('not-authorized');
	  	}
	  	Profiles.update({
	  		_id: this.userId
	  	}, {
	  		$set: {phone: phoneObj}
	  	});
	  },

	  'unsetPhone': function() {
  		if(!this.userId) {
	  		throw new Meteor.Error('not-authorized');
	  	}
	  	Profiles.update({
	  		_id: this.userId
	  	}, {
	  		$unset: {phone: ''}
	  	});
	  }

});
