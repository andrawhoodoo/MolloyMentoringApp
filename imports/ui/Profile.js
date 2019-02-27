import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

import NavBar from './NavBar';
import Footer from './Footer';
import AddressForm from './AddressForm';
import {Profiles} from '../api/profiles';

export default class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
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
	renderCustomHeader() {
		return <h1 className="user-name px-3 mb-4">{this.state.name.first}'s Profile</h1>;
	}
    render() {
        return (
            <div>
				<NavBar />
				<section id="profile-page" className="text-secondary mt-3">
					<div className="container">
						{this.renderCustomHeader()}
						<div className="user-customization px-3 py-4 bg-dark text-white">
							<AddressForm />
						</div>

					{/*	<div className="settings my-4 px-3">
							<div className="row py-2">
								<h4 className="px-3 font-weight-bold"><i className="fas fa-cogs"></i>&nbsp; Settings</h4>
							</div>
							<div className="row py-2">
								<div className="col-md-4">
									<button className="btn btn-dark btn-block">Change password</button>
								</div>
								<div className="col-md-4">
									<button className="btn btn-secondary btn-block">Request group change</button>
								</div>

								<div className="col-md-4">
									<button className="btn btn-dark btn-block">Contact an administrator</button>
								</div>
							</div>
							<div className="row py-2">
								<div className="col">
									<button className="btn btn-danger btn-block">Search for Groups</button>
								</div>
							</div>
						</div>*/}
					</div>
				</section>
				<Footer />
			</div>
        );
    }
};
