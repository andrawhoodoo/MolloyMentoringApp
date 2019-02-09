import { Meteor } from 'meteor/meteor';

// Must import all desired db collections as such
import '../imports/api/surveys';
import '../imports/api/questions';
import '../imports/api/users';

Meteor.startup(() => {
  // code to run on server at startup
});
