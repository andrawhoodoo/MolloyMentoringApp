import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

import NavBar from './NavBar';
import Footer from './Footer';
import ActiveGroups from './ActiveGroups';
import UserCreatedGroups from './UserCreatedGroups';
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
			<h1 className="welcome-name text-dark mb-4">Welcome {this.state.name.first}!</h1>
		);
	}
    render() {
        return (
            <div>
				<NavBar />
				<section id="home-page" className="text-secondary mt-3">
					<div className="px-3">
						{this.renderWelcome()}
					</div>
					<div className="notifications bg-dark text-white p-3 mb-4">
						<h4><i className="far fa-bell"></i>&nbsp; You have {this.state.notifications} new notifications!</h4>
					</div>
					<ActiveGroups />
					<UserCreatedGroups />
					<div className="text-center container py-5">
						<Link to='/group-search' className='text-white'>
								<button className='btn btn-danger btn-lg'>Search For Groups</button>
						</Link>
						<Link to='/create-group' className='text-white'>
							<button className='btn btn-info btn-lg'>Create a New Group!</button>
						</Link>
					</div>
				</section>
				<Footer />
			</div>
        );
    }
};
