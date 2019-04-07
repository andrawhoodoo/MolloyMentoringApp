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
import { Notifications } from '../api/notifications';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			notifications: []
		}
	}
	componentDidMount() {
		this.notificationsTracker = Tracker.autorun(() => {
			Meteor.subscribe('notificationsData');
			const notifications = Notifications.find().fetch();
			this.setState(notifications[0] ? {notifications: notifications} : {notifications: []});
		});
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
	findUser(userId) {
		Meteor.subscribe('getName');
		return Profiles.findOne({_id: userId}).name.first;
	}
	renderNotifications() {
		return this.state.notifications.map(notifications => {
			return (
			<p>Congratulations, You Have Matched With {this.findUser(notification.data)}!</p>
			)
		}
			
						   		
	}
    render() {
        return (
            <div className="full-page">
				<NavBar />
				<section id="home-page" className="text-secondary mt-3">
					<div className="px-3">
						{this.renderWelcome()}
					</div>


					<div className="notifications bg-dark text-white p-3 mb-4">
						<div class="accordion" id="accordionExample">
						 <div class="card">
						  <div class="card-header" id="headingOne">
						 	 <h2 class="mb-0">
						    	<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
									<h4><i className="far fa-bell"></i>&nbsp; You have {this.state.notifications.length} new notifications!</h4>
						    	</button>
						  	</h2>
						 </div>

						 <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
						   <div class="card-body">
						   		{this.renderNotifications()}
						       
						   </div>
						 </div>
					  </div>
					</div>


					<ActiveGroups />
					<UserCreatedGroups />
					<div className="text-center container py-5">
						<Link to='/group-search' className='text-white'>
								<button className='btn molloy-button btn-lg'>Search For Groups</button>
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
