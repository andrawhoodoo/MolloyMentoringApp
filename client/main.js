import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import '../imports/api/profiles';


import { routes, onAuthChange } from '../imports/routes/routes';

Tracker.autorun(() => {
	const isAuthenticated = !!Meteor.userId();
	onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
    ReactDOM.render(routes, document.getElementById('app'));
});
