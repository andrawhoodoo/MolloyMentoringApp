import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

import NavBar from './NavBar';
import Footer from './Footer';
import { Profiles } from '../api/profiles';





export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ''
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
        var myId = Meteor.userId();
        //var myEmail = Profiles.findOne({_id:myId}).email;
        return (
            <div>
				<NavBar />
				<section id="home-page" className="text-secondary mt-3">
					<div className="container">
						{this.renderWelcome()}
					</div>
					<div className="notifications bg-dark text-white p-3 mb-4">
						<h4><i className="far fa-bell"></i>&nbsp; You have [ X ] new notifications!</h4>
					</div>
					<div className="container">
						<div className="card mb-4">
							<div className="card-header">
								<h3>User's Active Groups</h3>
								<table className="table table-striped">
									<thead className="thead-dark">
										<tr>
											<th>Group Name</th>
											<th>Status</th>
											<th>Mentor/Mentee Name</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>Self-help</td>
											<td>Mentee</td>
											<td>John Doe</td>
											<td><a href="#" className="btn btn-danger text-white">Go To Group</a></td>
										</tr>
										<tr>
											<td>Algebra</td>
											<td>Mentor</td>
											<td>Terry Crews</td>
											<td><a href="#" className="btn btn-danger text-white">Go To Group</a></td>
										</tr>
										<tr>
											<td>World Domination</td>
											<td>Mentee</td>
											<td>Danny DeVito</td>
											<td><a href="#" className="btn btn-danger text-white">Go To Group</a></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</section>
				<Footer />
			</div>
        );
    }
};
