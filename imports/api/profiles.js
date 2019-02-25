Profiles = new Mongo.Collection('Profiles');


if(Meteor.isClient){

  Meteor.subscribe('profileData');
}

if(Meteor.isServer){
    Meteor.publish('profileData', function(){
        var currentUserId = this.userId;
        return Profiles.find({ _id: currentUserId });
    });
}

Meteor.methods({
    'createProfile': function(email, fName, lName){
        var currentUserId = Meteor.userId();
        if(currentUserId){
            Profiles.insert({
                // Assign _id to be identical to the new Account userId, add email & name
                _id: currentUserId,
                email: email,
                name:{
                  first: fName,
                  last: lName
                }
            });
        }
    },
});
