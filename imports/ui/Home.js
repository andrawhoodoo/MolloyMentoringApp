import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

import NavBar from './NavBar';
import Footer from './Footer';
import ActiveGroups from './ActiveGroups';
import { Profiles } from '../api/profiles';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			notifications: 0
		}
	}
	componentDidMount() {
		this.profileTracker = Tracker.autorun(() => {
			Meteor.subscribe('profileData');
			const profile = Profiles.find().fetch();
			this.setState(profile[0] ? {name: profile[0].name} : {name: ''});
		});
	}
	componentWillUnmount() {
		this.profileTracker.stop();
	}
	renderWelcome() {
		return (
			<h2 className="welcome-name px-3 mb-4">Welcome {this.state.name.first}!</h2>
		);
	}
    render() {
        return (
            <div>
				<NavBar />
				<section id="home-page" className="text-secondary mt-3">
					<div className="container">
						{this.renderWelcome()}
					</div>
					<div className="notifications bg-dark text-white p-3 mb-4">
						<h4><i className="far fa-bell"></i>&nbsp; You have {this.state.notifications} new notifications!</h4>
					</div>
					<ActiveGroups />
				</section>
				<Footer />
			</div>
        );
    }
};
