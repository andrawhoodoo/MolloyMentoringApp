import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

// Must import all desired db collections as such
import '../imports/api/surveys';
import '../imports/api/questions';
import '../imports/api/profiles';
import '../imports/api/groups';
import '../imports/api/answers';
import '../imports/api/mentorpairs';
import '../imports/api/options';
import '../imports/api/scores';
import '../imports/api/chatmessages';


Meteor.startup(() => {

  
});
